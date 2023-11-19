import Link from 'next/link'
import styles from './TopBar.module.css'

const TopBar = () => {
  return (
    <div>
        <div className="bg-red-800">
            <div className='flex flex-row-reverse text-white py-7 text-2xl '>
                <Link href="/Nosotros" className="mr-44">
                    <span className={styles.link}>Nosotros</span>
                </Link>
                <Link href="/" className="mr-44">
                    <span className={styles.link}>Inicio</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default TopBar