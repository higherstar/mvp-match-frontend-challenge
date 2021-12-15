// Export storage service
export class Storage {
    static setItem(key: string, data) {
        if (typeof data === "object") {
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            localStorage.setItem(key, data);
        }
    }

    static getItem(key) {
        let item = localStorage.getItem(key);
        try {
            if (item != null) {
                item = JSON.parse(item);
            }
        } catch (e) {
            return item;
        }
        return item;
    }

    static removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
