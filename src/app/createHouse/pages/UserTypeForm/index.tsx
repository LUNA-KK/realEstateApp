import Button from "@/components/Button";
import styles from "../index.module.css";
import { useHouseStore } from "../../useHouseStore";
import { useStep } from "../../useStep";

const type = [
  {
    id: 1,
    name: "세입자",
  },
  {
    id: 2,
    name: "집주인",
  },
];

export default function UserTypeForm() {
  const { userType, setUserType } = useHouseStore();
  const { nextStep } = useStep();

  const handleClick = (name: string) => {
    if (userType === name) {
      setUserType("");
      return;
    }
    setUserType(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {type.map((item) => (
          <Button
            classname={
              userType === item.name ? styles["button--select"] : styles.button
            }
            onClick={() => handleClick(item.name)}
            key={item.id}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <Button onClick={nextStep} disabled={userType === ""}>
        다음
      </Button>
    </div>
  );
}
