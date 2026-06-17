# Decisions

Record important product, technical, and execution decisions here.

## Product Brief

**What are we building?**
A resume-as-a-service website for sterile processing professionals (and adjacent healthcare fields). Customers pay, answer intake questions, upload their current resume, and receive a professionally improved resume back. AI agents (N8N) run in the background to research the target field and improve different resume aspects. A VA reviews the output, formats it on a Canva template, and emails the final resume to the customer.

**Who is it for?**
Primary: Sterile processing technicians and healthcare workers who need updated, properly-formatted resumes.
Secondary: Anyone looking for a job change who lacks a strong current resume.

**The core problem being solved:**
Many people — especially in sterile processing — don't have updated resumes with the right layout and language for the jobs they're targeting.

**What does success look like?**
- Customer lands on site, understands the service immediately, and can pay + submit in under 5 minutes
- Intake form captures: current role, target role, desired improvements, and resume upload
- N8N agents receive the data, process the resume, and send output to the VA via email
- VA reviews, formats on Canva template, emails completed resume to customer
- Customer feels they got a professional, personalized resume that helps them land interviews

**Customer flow:**
1. Land on marketing page → understand value proposition
2. Pay (Stripe or similar)
3. Fill intake questions (current job, target job, improvements, resume upload)
4. Confirmation email sent
5. N8N agents run: field research + multi-aspect resume improvement
6. VA receives email with agent output
7. VA pastes into Canva template, reviews, emails customer
8. (Future) Customer downloads from portal

**Human-in-loop:**
VA receives N8N output via email → Canva formatting → manual review → email delivery

## Technical Decisions

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Agent system**: Masterbuilder multi-agent infrastructure copied from terrysc107-cloud/masterbuilder
- **Branch**: `claude/setup-masterbuilder-agents-4khVw`

## Setup Log

- Masterbuilder agent infrastructure cloned and copied into repo
- All `.claude/` agents, commands, helpers, skills installed
- All `phases/`, `workflows/`, `docs/`, `templates/`, `memory/` directories present
- Ready to run phases starting from Phase 01 (Product Clarity)
