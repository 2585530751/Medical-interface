import { getRenderingEngine, type Types } from "@cornerstonejs/core";

function resetOriginal(renderingEngineId: string, viewportId: string) {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);
    // Get the stack viewport
    const viewport = <Types.IStackViewport>(
        renderingEngine!.getViewport(viewportId)
    );
    viewport.resetCamera();
    viewport.render();
}

function flipH(renderingEngineId: string, viewportId: string) {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);
    // Get the stack viewport
    const viewport = <Types.IStackViewport>(
        renderingEngine!.getViewport(viewportId)
    );
    const { flipHorizontal } = viewport.getCamera();
    viewport.setCamera({ flipHorizontal: !flipHorizontal });
    viewport.render();
}

function resetPan(renderingEngineId: string, viewportId: string) {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);
    // Get the stack viewport
    const viewport = <Types.IStackViewport>(
        renderingEngine!.getViewport(viewportId)
    );
    viewport.resetCamera(true, false);
    viewport.render();
}

function resetZoom(renderingEngineId: string, viewportId: string) {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);
    // Get the stack viewport
    const viewport = <Types.IStackViewport>(
        renderingEngine!.getViewport(viewportId)
    );
    viewport.resetCamera(false, true);
    viewport.render();
}

function invert(renderingEngineId: string, viewportId: string) {
    const renderingEngine = getRenderingEngine(renderingEngineId);

    // Get the stack viewport
    const viewport = <Types.IStackViewport>(
        renderingEngine!.getViewport(viewportId)
    );
    const { invert } = viewport.getProperties();
    viewport.setProperties({ invert: !invert });
    viewport.render();
}
export { resetOriginal, flipH, resetPan, resetZoom, invert }