import { supabase } from '@/lib/supabase'

// Ini fungsi khusus Next.js untuk mengambil data
async function getProjects() {
  const { data, error } = await supabase.from('projects').select('*')
  
  if (error) {
    console.error('Error:', error)
    return []
  }
  
  return data
}

export default async function TestPage() {
  const projects = await getProjects()

  return (
    <div style={{ padding: '50px' }}>
      <h1>Tes Koneksi Supabase</h1>
      <p>Jika daftar di bawah muncul, berarti SUKSES!</p>
      <hr />
      
      {/* Tampilkan data mentah dalam bentuk teks */}
      <pre>{JSON.stringify(projects, null, 2)}</pre>

      <hr />
      
      {/* Tampilkan judul project satu per satu */}
      <ul>
        {projects?.map((project) => (
          <li key={project.id}>
            <strong>{project.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}