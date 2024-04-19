import Link from 'next/link';
import styles from './TopBar.module.css';

const TopBar = () => {
  return (
    <div className="bg-red-800 flex justify-between items-center px-20 h-20 w-full">
      <div className="flex flex-1 justify-start">
        <Link href="/" className="text-white mr-10">
          <span className={styles.link}>Inicio</span>
        </Link>
        <Link href="/Nosotros" className="text-white mr-10">
          <span className={styles.link}>Nosotros</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <Link href="/AcercaApp" className="text-white">
          <span className={styles.link}>Acerca de la App</span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;