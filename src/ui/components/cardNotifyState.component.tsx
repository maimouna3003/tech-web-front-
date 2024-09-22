import { StateReducer } from "../../strore/reducer/State.reducer";
import { StateEnum } from "../../strore/State";

interface CardNotifyStateProps {}

const CardNotifyState: React.FC<CardNotifyStateProps> = () => {
  return (
    <>
      {StateReducer.stateSignal.value === StateEnum.Error && (
        <>
          <h2 style={{ color: "red", fontSize: 14 }}>
            {StateReducer.errorSignal.value}
          </h2>
        </>
      )}
    </>
  );
};

export default CardNotifyState;
