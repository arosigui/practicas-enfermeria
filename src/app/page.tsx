'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [status, setStatus] = useState('Comprobando conexión...')

  useEffect(() => {
    async function testConnection() {
      const { error } = await supabase.from('_test').select('*').limit(1)
      
      if (error && error.code === '42P01') {
        // La tabla no existe, pero la conexión funciona
        setStatus('✅ Conexión con Supabase OK')
      } else if (error) {
        setStatus(`❌ Error: ${error.message}`)
      } else {
        setStatus('✅ Conexión con Supabase OK')
      }
    }
    testConnection()
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Test de conexión</h1>
      <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>{status}</p>
    </div>
  )
}