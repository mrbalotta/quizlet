import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { ScreenGroupsRepository } from "@infra/navigation/api/mapper/ScreenGroupsRepository";
import { ScreenFactoryFactory } from "@infra/navigation/api/factory/ScreenFactoryFactory";
import { NavRef } from "@infra/navigation/impl/react/tree/NavRef";
import { NavRoot } from "@infra/navigation/impl/react/tree/NavRoot";
import { NavTreeFactory } from '@infra/navigation/api/factory/NavTreeFactory';

export class NavDefaultTree implements NavTreeFactory {

    constructor(
        private factory: ScreenFactoryFactory, 
        private groups: ScreenGroupsRepository
    ) {}

    create(): React.ReactElement {
        return (
            <NavigationContainer ref={NavRef}>
                <NavRoot.Navigator key="Default.Navigator" initialRouteName={this.groups.getGroupInitialRoute("default")}>
                    {this.factory.create(this.groups)}
                </NavRoot.Navigator>
            </NavigationContainer>
        )
    }
}