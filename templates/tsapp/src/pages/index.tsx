import * as React from "react";
import styles from "./index.css";
import { connect } from "dva";

import logo from "../assets/logo.png";

interface PageProps {
  dispatch: any;
  location: any;
  message: any;
}

@connect(state => state.global)
class App extends React.Component<PageProps> {
  public render() {
    const { message } = this.props;
    
    return (
      <div className={styles.App}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>{message}</h1>
        </header>
        <p className={styles.intro}>
          To get started, edit <code>src/pages/index.tsx</code> and save to
          reload.
        </p>
      </div>
    );
  }
}

export default App;
