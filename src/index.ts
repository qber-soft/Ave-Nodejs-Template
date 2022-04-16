import { App, WindowCreation, Window, WindowFlag, Grid, Button } from 'ave-ui';
import * as path from "path";

export function main(window: Window) {
    const button = new Button(window);
    button.SetText("Button");
    button.OnClick(sender => {
        sender.SetText("Button Clicked");
        console.log("button clicked");
    });

    const container = get3x3Grid(window);
    container.ControlAdd(button).SetGrid(1, 1)
    window.SetContent(container);
}

run(main);

export function run(main: Function) {
    const app = new App();

    const iconDataMap = {
        WindowIcon: [path.resolve(__dirname, "../assets/Ave#0.png"), path.resolve(__dirname, "../assets/Ave#1.png"), path.resolve(__dirname, "../assets/Ave#2.png")],
    };
    const resMap = app.CreateResourceMap(app, [16, 24, 32], iconDataMap);

    globalThis.app = app;

    //
    const cpWindow = new WindowCreation();
    cpWindow.Title = 'Ave Template';
    cpWindow.Flag |= WindowFlag.Layered;

    const window = new Window(cpWindow);
    globalThis._window = window;

    window.OnCreateContent(window => {
        window.SetIcon(resMap.WindowIcon);
        main(window);
        return true
    })

    if (!window.CreateWindow())
        process.exit(-1);

    window.SetVisible(true);
    window.Activate();
}

export function get3x3Grid(window: Window, width = 120, height = 32) {
    const container = new Grid(window);
    container.ColAddSlice(1);
    container.ColAddDpx(width);
    container.ColAddSlice(1);

    container.RowAddSlice(1);
    container.RowAddDpx(height);
    container.RowAddSlice(1);
    return container;
}