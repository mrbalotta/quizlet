import { DI } from "@infra/di/impl/DI";
import { DIContext } from "@infra/di/view/DIContext";
import { NavTreeFactory } from "@infra/navigation/api/factory/NavTreeFactory";

export const App: React.FunctionComponent<{}> = () => {
  const diInstance = DI.getInstance()
  const tree = diInstance.inject<NavTreeFactory>("NavTreeFactory")

  return (
    <DIContext.Provider value={diInstance}>
        {tree.create()}
    </DIContext.Provider>
  );
};