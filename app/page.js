import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to full stack next app</h1>
      <Link href="viewproducts">View Products</Link>
      <Link href="addproducts">Add Products</Link>
    </main>
  );
}
