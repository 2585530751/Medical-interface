import * as cornerstoneTools from '@cornerstonejs/tools';
import type { IToolGroup } from '@cornerstonejs/tools/dist/esm/types';
import { useImageStateStore } from '@/stores/imageState'

const imageStateStore = useImageStateStore();
const {
    PanTool,
    WindowLevelTool,
    StackScrollMouseWheelTool,
    ZoomTool,
    PlanarRotateTool,

    LengthTool,
    ProbeTool,
    RectangleROITool,
    EllipticalROITool,
    CircleROITool,
    BidirectionalTool,
    AngleTool,
    CobbAngleTool,
    ArrowAnnotateTool,
    ToolGroupManager,
    Enums: csToolsEnums,
} = cornerstoneTools;
const { MouseBindings } = csToolsEnums;
function createTools(viewportId: string, renderingEngineId: string, toolGroupId: string) {
    // Add tools to Cornerstone3D
    cornerstoneTools.addTool(LengthTool);
    cornerstoneTools.addTool(ProbeTool);
    cornerstoneTools.addTool(RectangleROITool);
    cornerstoneTools.addTool(EllipticalROITool);
    cornerstoneTools.addTool(CircleROITool);
    cornerstoneTools.addTool(BidirectionalTool);
    cornerstoneTools.addTool(AngleTool);
    cornerstoneTools.addTool(CobbAngleTool);
    cornerstoneTools.addTool(ArrowAnnotateTool);

    cornerstoneTools.addTool(PanTool);
    cornerstoneTools.addTool(WindowLevelTool);
    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.addTool(ZoomTool);
    cornerstoneTools.addTool(PlanarRotateTool);

    // Define a tool group, which defines how mouse events map to tool commands for
    // Any viewport using the group
    const toolGroup = cornerstoneTools.ToolGroupManager.createToolGroup(toolGroupId) as IToolGroup;

    // Add the tools to the tool group
    toolGroup.addTool(LengthTool.toolName);
    toolGroup.addTool(ProbeTool.toolName);
    toolGroup.addTool(RectangleROITool.toolName);
    toolGroup.addTool(EllipticalROITool.toolName);
    toolGroup.addTool(CircleROITool.toolName);
    toolGroup.addTool(BidirectionalTool.toolName);
    toolGroup.addTool(AngleTool.toolName);
    toolGroup.addTool(CobbAngleTool.toolName);
    toolGroup.addTool(ArrowAnnotateTool.toolName);

    toolGroup.addTool(WindowLevelTool.toolName);
    toolGroup.addTool(PanTool.toolName);
    toolGroup.addTool(ZoomTool.toolName);
    toolGroup.addTool(StackScrollMouseWheelTool.toolName, { loop: true });
    toolGroup.addTool(PlanarRotateTool.toolName);

    // Set the initial state of the tools, here we set one tool active on left click.
    // This means left click will draw that tool.
    toolGroup.setToolPassive(LengthTool.toolName);
    // We set all the other tools passive here, this means that any state is rendered, and editable
    // But aren't actively being drawn (see the toolModes example for information)
    toolGroup.setToolPassive(ProbeTool.toolName);
    toolGroup.setToolPassive(RectangleROITool.toolName);
    toolGroup.setToolPassive(EllipticalROITool.toolName);
    toolGroup.setToolPassive(CircleROITool.toolName);
    toolGroup.setToolPassive(BidirectionalTool.toolName);
    toolGroup.setToolPassive(AngleTool.toolName);
    toolGroup.setToolPassive(CobbAngleTool.toolName);
    toolGroup.setToolPassive(ArrowAnnotateTool.toolName);

    // As the Stack Scroll mouse wheel is a tool using the `mouseWheelCallback`
    // hook instead of mouse buttons, it does not need to assign any mouse button.
    toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);
    toolGroup.setToolActive(PanTool.toolName, {
        bindings: [
            {
                mouseButton: MouseBindings.Auxiliary, // Middle Click
            },
        ],
    });
    toolGroup.setToolActive(ZoomTool.toolName, {
        bindings: [
            {
                mouseButton: MouseBindings.Secondary, // Right Click
            },
        ],
    });


    toolGroup!.addViewport(viewportId, renderingEngineId);

    imageStateStore.leftMouseActive = ArrowAnnotateTool.toolName;
    imageStateStore.toolGroup = toolGroup;
    imageStateStore.bindLeftMouse(LengthTool.toolName);
}

export default createTools;