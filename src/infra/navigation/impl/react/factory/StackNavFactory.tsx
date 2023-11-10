
import React from 'react'
import { ScreenFactory } from '@infra/navigation/api/factory/ScreenFactory';
import { ScreenInfo } from '@infra/navigation/api/data/ScreenInfo';
import { NavRoot } from '@infra/navigation/impl/react/tree/NavRoot';


export class StackNavFactory implements ScreenFactory {
    private static counter = 0

    constructor(private groupName: string, private infos: ScreenInfo[], private initialRoute: string) {}

    create(): React.ReactElement {
        return (
            <NavRoot.Group 
                key={`${this.groupName}-${++StackNavFactory.counter}`}>
                {
                    this.infos.map(item => {
                        return (
                            <NavRoot.Screen
                                name={item.getRoute()}
                                component={item.getComponent()}
                                key={item.getRoute()} 
                                options={ { title: item.getTitle(), headerShown: item.isHeaderShown() } } />
                        )
                    })
                }
            </NavRoot.Group>
        )
    }
}