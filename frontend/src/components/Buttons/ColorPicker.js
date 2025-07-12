import styles from './ColorPicker.module.css';

function ColorPicker({ name }) {
    return (
      <div className={styles.ColorPicker}>
          <p>{name + ": "}</p>
          <input type="color"></input>
      </div>
    );
}

export default ColorPicker;