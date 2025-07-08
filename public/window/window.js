class Window_manager {
    constructor() {
        this.loadedModules = new Map();
        this.windows = new Map();
        this.window_box = null;
        this.load();
    }

    load() {
        this.create_windowbox();
    }

    create_windowbox() {
        this.window_box = document.createElement('div');
        this.window_box.className = window.window_.box;
        document.body.appendChild(this.window_box);
    }

    async loadModule(modulePath) {
        for (let [id, window] of this.windows) {
            this.close_window(id);
        }
        
        if (this.loadedModules.has(modulePath)) {
            this.create_window(modulePath, this.loadedModules.get(modulePath));
            return;
        }
        const module = await import(modulePath);
        this.loadedModules.set(modulePath, module);
        this.create_window(modulePath, module);
    }

    create_window(modulePath, module) {
        const windowId = `window-${Date.now()}`;
        const Element = document.createElement('div');
        Element.className = window.window_.box;
        Element.id = windowId;
        Element.innerHTML = `<div class="${window.window_.content}"></div>`;

        this.window_box.appendChild(Element);
        this.windows.set(windowId, { element: Element, module, path: modulePath });

        if (module.default && typeof module.default.open === 'function') {
            module.default.open(Element.querySelector('div'));
        }
    }

    close_window(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.element.remove();
            this.windows.delete(windowId);
        }
    }

    open_window(modulePath) {
        for (let [id, window] of this.windows) {
            if (window.path === modulePath) {
                window.element.style.zIndex = Date.now();
                return;
            }
        }
    }
}

const window_manager = new Window_manager();
window.open_menu = function(modulePath) {
    window_manager.loadModule(modulePath);
}