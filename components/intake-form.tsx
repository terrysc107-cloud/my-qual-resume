"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { submitIntakeForm } from "@/app/actions/submit-intake"

type PackageType = 'starter' | 'standard' | 'premium'
type TemplateType = 'Classic' | 'Modern' | 'Executive'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  currentTitle: string
  yearsExp: string
  package: PackageType
  targetTitle: string
  industry: string
  jobDescription: string
  workHistory: string
  certifications: string
  notes: string
  template: TemplateType
  resumeUrl: string
}

const packageInfo: Record<PackageType, { label: string; delivery: string }> = {
  starter: { label: "Starter — $29", delivery: "48 hours" },
  standard: { label: "Standard — $49", delivery: "48 hours" },
  premium: { label: "Premium — $79", delivery: "24 hours" }
}

export function IntakeForm() {
  const searchParams = useSearchParams()
  const urlPackage = searchParams.get('package')
  const lockedPackage: PackageType | null = 
    urlPackage === 'starter' || urlPackage === 'standard' || urlPackage === 'premium'
      ? urlPackage
      : null

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [orderRef, setOrderRef] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [validationError, setValidationError] = useState("")
  const [uploadingFile, setUploadingFile] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [uploadError, setUploadError] = useState("")

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentTitle: "",
    yearsExp: "",
    package: lockedPackage ?? "starter",
    targetTitle: "",
    industry: "",
    jobDescription: "",
    workHistory: "",
    certifications: "",
    notes: "",
    template: "Classic",
    resumeUrl: ""
  })

  useEffect(() => {
    if (lockedPackage) {
      setFormData(prev => ({ ...prev, package: lockedPackage }))
    }
  }, [lockedPackage])

  const updateField = (field: keyof FormData, value: string) => {
    setValidationError("")
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError("")
    setUploadingFile(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload-resume', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) {
        setUploadError(data.error ?? 'Upload failed')
      } else {
        updateField('resumeUrl', data.url)
        setUploadedFileName(file.name)
      }
    } catch {
      setUploadError('Upload failed — please try again')
    } finally {
      setUploadingFile(false)
    }
  }

  const nextStep = () => {
    setValidationError("")
    if (currentStep === 1) {
      if (!formData.firstName.trim()) return setValidationError("First name is required.")
      if (!formData.lastName.trim()) return setValidationError("Last name is required.")
      if (!formData.email.trim() || !formData.email.includes('@')) return setValidationError("A valid email address is required.")
      if (!formData.currentTitle.trim()) return setValidationError("Current job title is required.")
      if (!formData.yearsExp) return setValidationError("Years of experience is required.")
    }
    if (currentStep === 3) {
      if (!formData.targetTitle.trim()) return setValidationError("Target job title is required.")
      if (!formData.jobDescription.trim() || formData.jobDescription.trim().length < 30) return setValidationError("Please paste the full job description (at least 30 characters).")
      if (!formData.workHistory.trim() || formData.workHistory.trim().length < 50) return setValidationError("Please describe your work history (at least 50 characters).")
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setErrorMessage("")
    
    const result = await submitIntakeForm(formData)
    
    if (result.success) {
      setOrderRef(result.orderRef)
      setIsSubmitted(true)
    } else {
      setErrorMessage(result.error)
    }
    
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-20 px-10 animate-fade-up">
        <div className="w-[72px] h-[72px] bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center text-3xl mx-auto mb-7">
          ✓
        </div>
        <h3 className="font-serif text-3xl font-light text-ink mb-3">Order received.</h3>
        <p className="text-[11px] text-ink4 leading-[1.9] max-w-md mx-auto mb-6">
          Thank you. Your order has been submitted and our team is on it. You will receive your resume package at the email you provided within your chosen timeframe.
        </p>
        <div className="inline-block bg-fog border border-fog3 px-6 py-3 text-[10px] text-ink3 tracking-wide mb-6">
          Order Reference: <strong className="text-gold">{orderRef}</strong>
        </div>
        <p className="text-[10px] text-ink4 tracking-wide">
          Questions? Email <strong>Terry@scottadvisory.net</strong>
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-ink px-6 md:px-8 py-5 flex items-center justify-between">
        <div className="text-[9px] tracking-[0.18em] uppercase text-white/50">
          Order Form — Qualified Resume Co
        </div>
        <div className="flex gap-1.5 items-center">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i}
              className={cn(
                "h-2 rounded transition-all",
                i < currentStep ? "w-2 bg-gold/40" : "",
                i === currentStep ? "w-6 bg-gold" : "",
                i > currentStep ? "w-2 bg-white/10" : ""
              )}
            />
          ))}
        </div>
      </div>

      {/* Step navigation */}
      <div className="flex border-b border-fog3">
        {[
          "01 — Your Info",
          "02 — Package",
          "03 — Job Details",
          "04 — Template"
        ].map((label, i) => (
          <div 
            key={i}
            className={cn(
              "flex-1 px-3 md:px-6 py-4 text-[8px] md:text-[9px] tracking-[0.12em] uppercase border-b-2 -mb-px transition-colors flex items-center gap-1",
              i + 1 === currentStep ? "text-gold border-gold" : "",
              i + 1 < currentStep ? "text-ink4 border-transparent" : "",
              i + 1 > currentStep ? "text-ink/25 border-transparent" : ""
            )}
          >
            {label}{i + 1 < currentStep ? " ✓" : ""}
          </div>
        ))}
      </div>

      {/* Form body */}
      <div className="p-6 md:p-10 lg:p-12">
        {/* Step 1: Your Info */}
        {currentStep === 1 && (
          <div className="animate-fade-up">
            <h3 className="font-serif text-2xl font-light text-ink mb-1.5">Tell us about yourself</h3>
            <p className="text-[10px] text-ink4 tracking-wide leading-[1.7] mb-8">
              Basic contact information so we can deliver your resume and follow up if needed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                  First Name <em className="text-destructive not-italic ml-0.5">*</em>
                </label>
                <input 
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  placeholder="First name"
                  className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                  Last Name <em className="text-destructive not-italic ml-0.5">*</em>
                </label>
                <input 
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  placeholder="Last name"
                  className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Email Address <em className="text-destructive not-italic ml-0.5">*</em>
              </label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors"
              />
              <p className="text-[9px] text-ink/35 mt-1.5 leading-relaxed tracking-wide">
                Your completed resume will be delivered to this email.
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Phone Number
              </label>
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Current or Most Recent Job Title <em className="text-destructive not-italic ml-0.5">*</em>
              </label>
              <input 
                type="text"
                value={formData.currentTitle}
                onChange={(e) => updateField('currentTitle', e.target.value)}
                placeholder="e.g. Sterile Processing Technician, SPD Supervisor"
                className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Years of Experience <em className="text-destructive not-italic ml-0.5">*</em>
              </label>
              <select 
                value={formData.yearsExp}
                onChange={(e) => updateField('yearsExp', e.target.value)}
                className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink focus:border-gold focus:bg-white outline-none transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%226%22%3E%3Cpath%20d%3D%22M0%200l5%206%205-6z%22%20fill%3D%22%234a4a4a%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_14px_center] pr-9"
              >
                <option value="">Select range</option>
                <option>0–2 years</option>
                <option>3–5 years</option>
                <option>6–10 years</option>
                <option>11–15 years</option>
                <option>15+ years</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Package */}
        {currentStep === 2 && (
          <div className="animate-fade-up">
            <h3 className="font-serif text-2xl font-light text-ink mb-1.5">
              {lockedPackage ? 'Your selected package' : 'Choose your package'}
            </h3>
            <p className="text-[10px] text-ink4 tracking-wide leading-[1.7] mb-8">
              {lockedPackage
                ? 'Your package has been pre-selected based on your payment. You are all set.'
                : 'Select the package that fits your needs. Payment is completed after submission.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              {[
                { id: 'starter' as const, name: 'Starter', price: '$29', features: '1 resume · ATS optimized\nExpert review · 48hr · 2 revisions' },
                { id: 'standard' as const, name: 'Standard ★', price: '$49', features: '2 resumes · Cover letter\nCompany research · 48hr · 3 revisions' },
                { id: 'premium' as const, name: 'Premium', price: '$79', features: '3 resumes · Cover letter\nLinkedIn summary · 24hr · 3 revisions' },
              ].map(pkg => {
                const isSelected = formData.package === pkg.id
                const isLocked = !!lockedPackage
                const isDisabled = isLocked && !isSelected
                return (
                  <div 
                    key={pkg.id}
                    onClick={() => !isLocked && updateField('package', pkg.id)}
                    className={cn(
                      "border-[1.5px] p-5 transition-all relative",
                      isDisabled ? "border-fog3 bg-fog opacity-35 cursor-not-allowed" : "cursor-pointer",
                      isSelected && !isLocked ? "border-gold bg-[#fdf9f0]" : "",
                      isSelected && isLocked ? "border-gold bg-[#fdf9f0] ring-1 ring-gold/30" : "",
                      !isSelected && !isLocked ? "border-fog3 bg-fog hover:border-gold hover:bg-[#fdf9f0]" : ""
                    )}
                  >
                    {isSelected && (
                      <span className="absolute top-2.5 right-3 text-[10px] text-gold">
                        {isLocked ? 'Paid' : '✓'}
                      </span>
                    )}
                    <div className="text-[11px] font-medium text-ink mb-1">{pkg.name}</div>
                    <div className="font-serif text-2xl font-light text-gold leading-none mb-2">{pkg.price}</div>
                    <div className="text-[9px] text-ink4 leading-[1.7] tracking-wide whitespace-pre-line">{pkg.features}</div>
                  </div>
                )
              })}
            </div>
            <p className="text-[9px] text-ink/35 leading-relaxed tracking-wide">
              {lockedPackage
                ? 'Package locked based on your Square payment.'
                : '★ Most popular — includes cover letter and company-specific research'}
            </p>
          </div>
        )}

        {/* Step 3: Job Details */}
        {currentStep === 3 && (
          <div className="animate-fade-up">
            <h3 className="font-serif text-2xl font-light text-ink mb-1.5">Target role + your background</h3>
            <p className="text-[10px] text-ink4 tracking-wide leading-[1.7] mb-8">
              The more detail you provide, the stronger your resume will be.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                  Target Job Title <em className="text-destructive not-italic ml-0.5">*</em>
                </label>
                <input 
                  type="text"
                  value={formData.targetTitle}
                  onChange={(e) => updateField('targetTitle', e.target.value)}
                  placeholder="e.g. Lead Sterile Processing Tech, SPD Manager, Surgical Technologist"
                  className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                  Target Industry
                </label>
                <select 
                  value={formData.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink focus:border-gold focus:bg-white outline-none transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%226%22%3E%3Cpath%20d%3D%22M0%200l5%206%205-6z%22%20fill%3D%22%234a4a4a%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_14px_center] pr-9"
                >
                  <option value="">Select industry</option>
                  <option>Sterile Processing / SPD</option>
                  <option>Healthcare</option>
                  <option>Technology</option>
                  <option>Finance / Banking</option>
                  <option>Marketing / Sales</option>
                  <option>Supply Chain / Logistics</option>
                  <option>Operations / Management</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Job Description <em className="text-destructive not-italic ml-0.5">*</em>
              </label>
              <textarea 
                value={formData.jobDescription}
                onChange={(e) => updateField('jobDescription', e.target.value)}
                placeholder="Paste the full job description here — requirements, responsibilities, preferred qualifications. The more complete, the better we can tailor your resume."
                className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors resize-y min-h-[160px] leading-[1.75]"
              />
              <p className="text-[9px] text-ink/35 mt-1.5 leading-relaxed tracking-wide">
                Copy and paste directly from the job posting. Include everything.
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Your Work History + Key Accomplishments <em className="text-destructive not-italic ml-0.5">*</em>
              </label>
              <textarea 
                value={formData.workHistory}
                onChange={(e) => updateField('workHistory', e.target.value)}
                placeholder={"List your work experience, key responsibilities, and accomplishments including:\n• Job titles, companies, dates\n• Key responsibilities\n• Measurable achievements (saved $X, reduced time by X%, managed team of X)\n• Certifications, education, skills"}
                className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors resize-y min-h-[200px] leading-[1.75]"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Certifications and Education
              </label>
              <textarea 
                value={formData.certifications}
                onChange={(e) => updateField('certifications', e.target.value)}
                placeholder="e.g. CRCST, CIS, CER, CBSPD, IAHCSMM Member, Associate's Degree in Surgical Technology"
                className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors resize-y min-h-[80px] leading-[1.75]"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Upload Your Current Resume
                <span className="ml-2 text-ink/30 normal-case tracking-normal">(PDF or DOCX, max 10MB)</span>
              </label>
              <div className={cn(
                "border border-fog3 bg-fog p-4 transition-colors",
                uploadedFileName ? "border-gold bg-[#fdf9f0]" : ""
              )}>
                {uploadedFileName ? (
                  <div className="flex items-center gap-3">
                    <span className="text-gold text-sm">✓</span>
                    <span className="text-[10px] text-ink tracking-wide">{uploadedFileName}</span>
                    <button
                      type="button"
                      onClick={() => { updateField('resumeUrl', ''); setUploadedFileName('') }}
                      className="text-[9px] text-ink4 hover:text-red-500 ml-auto tracking-wide"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center gap-2 cursor-pointer py-4">
                    <span className="text-[10px] text-ink4 tracking-wide">
                      {uploadingFile ? 'Uploading...' : 'Click to select your resume'}
                    </span>
                    <span className="text-[9px] text-ink/30 tracking-wide">PDF or DOCX accepted</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {uploadError && (
                <p className="text-[9px] text-red-500 mt-1.5 tracking-wide">{uploadError}</p>
              )}
              <p className="text-[9px] text-ink/35 mt-1.5 leading-relaxed tracking-wide">
                Optional but recommended — helps us match your existing format and experience.
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Anything Else We Should Know?
              </label>
              <textarea 
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Career gaps, industry changes, specific accomplishments to highlight, etc."
                className="w-full px-4 py-3 border border-fog3 bg-fog text-xs text-ink placeholder:text-ink/25 focus:border-gold focus:bg-white outline-none transition-colors resize-y min-h-[80px] leading-[1.75]"
              />
            </div>
          </div>
        )}

        {/* Step 4: Template */}
        {currentStep === 4 && (
          <div className="animate-fade-up">
            <h3 className="font-serif text-2xl font-light text-ink mb-1.5">Choose your template style</h3>
            <p className="text-[10px] text-ink4 tracking-wide leading-[1.7] mb-8">
              Our team will format your resume in your chosen style. All templates are ATS-compatible.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
              {[
                { id: 'Classic' as const, name: 'Classic', desc: 'Clean and traditional. Works everywhere.', bg: 'white' },
                { id: 'Modern' as const, name: 'Modern', desc: 'Bold header, strong visual hierarchy.', bg: 'white' },
                { id: 'Executive' as const, name: 'Executive', desc: 'Sophisticated. For senior roles.', bg: 'ink' },
              ].map(tmpl => (
                <div 
                  key={tmpl.id}
                  onClick={() => updateField('template', tmpl.id)}
                  className={cn(
                    "border-[1.5px] cursor-pointer transition-all overflow-hidden",
                    formData.template === tmpl.id ? "border-gold" : "border-fog3 hover:border-gold"
                  )}
                >
                  <div className={cn(
                    "h-24 flex flex-col gap-1 p-3",
                    tmpl.bg === 'ink' ? "bg-ink" : "bg-white"
                  )}>
                    {tmpl.id === 'Classic' && (
                      <>
                        <div className="h-1.5 bg-gold2 w-2/5 rounded-sm" />
                        <div className="h-2 bg-fog3 w-3/5 rounded-sm" />
                        <div className="h-1.5 bg-fog3 w-2/5 rounded-sm" />
                        <div className="h-2" />
                        <div className="h-1 bg-fog3 w-full rounded-sm" />
                        <div className="h-1 bg-fog3 w-3/5 rounded-sm" />
                        <div className="h-1 bg-fog3 w-2/5 rounded-sm" />
                      </>
                    )}
                    {tmpl.id === 'Modern' && (
                      <>
                        <div className="h-2.5 bg-gold2 w-full mb-1.5" />
                        <div className="h-2 bg-fog3 w-3/5 rounded-sm" />
                        <div className="h-1.5 bg-fog3 w-2/5 rounded-sm" />
                        <div className="h-1.5" />
                        <div className="h-1 bg-fog3 w-full rounded-sm" />
                        <div className="h-1 bg-fog3 w-3/5 rounded-sm" />
                      </>
                    )}
                    {tmpl.id === 'Executive' && (
                      <>
                        <div className="h-1.5 bg-gold2 w-full" />
                        <div className="h-1" />
                        <div className="h-2 bg-white/30 w-3/5 rounded-sm" />
                        <div className="h-1.5 bg-white/15 w-2/5 rounded-sm" />
                        <div className="h-1.5" />
                        <div className="h-1 bg-white/10 w-full rounded-sm" />
                        <div className="h-1 bg-white/10 w-3/5 rounded-sm" />
                      </>
                    )}
                  </div>
                  <div className="p-3 bg-fog">
                    <div className="text-[10px] text-ink mb-0.5">{tmpl.name}</div>
                    <div className="text-[9px] text-ink4 tracking-wide">{tmpl.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <label className="block text-[8px] tracking-[0.16em] uppercase text-ink4 mb-2">
                Order Summary
              </label>
              <div className="bg-fog border border-fog3 p-4 md:p-5">
                <div className="flex justify-between text-[11px] py-1.5 border-b border-fog3 tracking-wide">
                  <span className="text-ink4">Package</span>
                  <span className="text-ink font-medium">{packageInfo[formData.package].label}</span>
                </div>
                <div className="flex justify-between text-[11px] py-1.5 border-b border-fog3 tracking-wide">
                  <span className="text-ink4">Template</span>
                  <span className="text-ink font-medium">{formData.template}</span>
                </div>
                <div className="flex justify-between text-[11px] py-1.5 tracking-wide">
                  <span className="text-ink4">Delivery</span>
                  <span className="text-ink font-medium">{packageInfo[formData.package].delivery}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      {validationError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-[10px] tracking-wide leading-relaxed">
          {validationError}
        </div>
      )}
      </div>

      {/* Form footer */}
      <div className="px-6 md:px-10 lg:px-12 py-6 bg-fog border-t border-fog3 flex items-center justify-between">
        <div className="text-[9px] text-ink4 tracking-widest">
          Step {currentStep} of 4
        </div>
        <div className="flex gap-2.5">
          {currentStep > 1 && (
            <button 
              onClick={prevStep}
              className="bg-transparent border border-fog3 text-ink4 text-[9px] tracking-[0.14em] uppercase px-6 py-2.5 hover:border-ink hover:text-ink transition-colors"
            >
              Back
            </button>
          )}
          {currentStep < 4 && (
            <button 
              onClick={nextStep}
              className="bg-ink text-white text-[9px] tracking-[0.16em] uppercase px-8 py-2.5 hover:bg-gold hover:text-ink transition-colors"
            >
              Continue
            </button>
          )}
          {currentStep === 4 && (
            <div>
              {errorMessage && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-600 text-sm">
                  Error: {errorMessage}
                </div>
              )}
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gold text-ink text-[9px] tracking-[0.16em] uppercase px-10 py-3 font-medium hover:bg-gold2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Order'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
