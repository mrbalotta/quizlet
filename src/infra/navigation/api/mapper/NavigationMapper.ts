import { ScreenInfo } from "@infra/navigation/api/data/ScreenInfo";

export interface NavigationMapper {
  addScreen(info: ScreenInfo): NavigationMapper;
}
