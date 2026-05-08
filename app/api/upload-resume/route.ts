import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Only PDF and DOCX files are accepted' }, { status: 400 })
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File must be under 10MB' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Storage not configured' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  const ext = file.name.split('.').pop() ?? 'pdf'
  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 8)
  const fileName = `${timestamp}-${random}.${ext}`
  const path = `resumes/${fileName}`

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const { error } = await supabase.storage
    .from('resume-uploads')
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: urlData } = supabase.storage
    .from('resume-uploads')
    .getPublicUrl(path)

  return NextResponse.json({ url: urlData.publicUrl })
}
