import styles from "./ErrorScreen.module.css";

export const ErrorScreen = ({ errorStatus, errorMessage }) => {
  return (
    <div className={styles.wrapper}>
      <h1>Erreur {errorStatus}</h1>
      <p className={styles.message}>{errorMessage}</p>
    </div>
  );
};
