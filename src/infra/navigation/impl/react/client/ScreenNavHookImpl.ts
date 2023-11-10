import { ScreenNavHook } from '@infra/navigation/api/client/ScreenNavHook'
import { useFocusEffect as useFocusEffectFromLib } from '@react-navigation/native';
import { useCallback } from 'react';

export class ScreenNavHookImpl implements ScreenNavHook {
    useFocusEffect(fn: () => () => void, dep: any[]): void {
        useFocusEffectFromLib(useCallback(fn, dep))
    }
}