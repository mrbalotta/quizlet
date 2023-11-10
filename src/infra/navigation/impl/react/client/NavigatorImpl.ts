import { Navigator } from "@infra/navigation/api/client/Navigator";
import { ScreenGroupsRepository } from "@infra/navigation/api/mapper/ScreenGroupsRepository";
import { StackActions, createNavigationContainerRef } from "@react-navigation/native";

export class NavigatorImpl implements Navigator {
  static readonly navigationRef = createNavigationContainerRef<any>();
  static readonly stackActionsRef = StackActions;

  constructor(private groups: ScreenGroupsRepository) {}

  navigate(route: string, value?: any): void {
    const ref = NavigatorImpl.navigationRef;
    if (ref.isReady()) {
      const info = this.groups.getScreenByRoute(route);
      if (info) {
        if (info.getGroupName() == "default" || info.getGroupName() == "overlay") ref.navigate(route, value);
        else
          ref.navigate(info.getGroupName(), {
            screen: info.getRoute(),
            params: { ...value },
          });
      } else {
       console.log(`no info found ${route}`);
      }
    }
  }

  goBack(): void {
    const ref = NavigatorImpl.navigationRef;
    if (ref.isReady()) {
      ref.goBack();
    }
  }

  addToStack(route: string, value?: any): void{
    const refStackActions = NavigatorImpl.stackActionsRef
    const ref = NavigatorImpl.navigationRef;
    const pushAction = refStackActions.push(route, value);
    
    ref.dispatch(pushAction);
  }
}
