import styles from './index.module.css';

function Layout({ children, loading, sidebar, error }) {
  const renderContent = () => {
    if (error) {
      return error.message;
    }

    if (loading) {
      return 'Loading...';
    }

    return children;
  };

  return (
    <div className={styles.container}>
      {sidebar}

      <hr className={styles.divider} />

      <div>{renderContent()}</div>
    </div>
  );
}

export default Layout;
