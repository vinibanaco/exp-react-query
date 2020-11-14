import styles from './index.module.css';

function Layout({ children, loading, sidebar }) {
  return (
    <div className={styles.container}>
      {sidebar}

      <hr className={styles.divider} />

      <div>{loading ? 'Loading...' : children}</div>
    </div>
  );
}

export default Layout;
