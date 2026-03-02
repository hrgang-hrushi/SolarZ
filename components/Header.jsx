import Link from 'next/link'

export default function Header(){
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 24px',borderBottom:'1px solid #eee'}}>
      <div style={{fontWeight:700}}>Solarify</div>
      <nav>
        <Link href="/" style={{marginRight:16}}>Home</Link>
        <Link href="/service" style={{marginRight:16}}>Services</Link>
        <Link href="/project" style={{marginRight:16}}>Projects</Link>
        <Link href="/about" style={{marginRight:16}}>About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  )
}
