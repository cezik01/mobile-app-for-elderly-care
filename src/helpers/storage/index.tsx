import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadString(key: string): Promise<string | null> {
    try {
        return await AsyncStorage.getItem(key);
    } catch {
        return null;
    }
}

export async function saveString(key: string, value: string): Promise<boolean> {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
}

export async function load(key: string): Promise<any | null> {
    try {
        const str = await AsyncStorage.getItem(key);
        if (typeof str !== 'string') {
            return null;
        }
        return JSON.parse(str);
    } catch {
        return null;
    }
}

export async function save(key: string, value: any): Promise<boolean> {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

export async function remove(key: string): Promise<void> {
    try {
        await AsyncStorage.removeItem(key);
    } catch {
        return;
    }
}

export async function clear(): Promise<void> {
    try {
        await AsyncStorage.clear();
    } catch {
        return;
    }
}
