import * as cornerstoneTools from '@cornerstonejs/tools';
import type { IToolGroup } from '@cornerstonejs/tools/dist/esm/types';
import { useImageStateStore } from '@/store/imageState'
import { volumeLoader } from '@cornerstonejs/core'

const imageStateStore = useImageStateStore();
const {
    Synchronizer,
    segmentation,
    AnnotationDisplayTool,
    ReferenceCursors,
    ReferenceLines,
    // ScaleOverlayTool,

    DragProbeTool,

    BrushTool,
    CircleScissorsTool,
    MIPJumpToClickTool,
    MagnifyTool,
    PaintFillTool,
    RectangleScissorsTool,
    SegmentationDisplayTool,
    SphereScissorsTool,
    StackScrollTool,
    TrackballRotateTool,
    VolumeRotateMouseWheelTool,

    PanTool,
    WindowLevelTool,
    StackScrollMouseWheelTool,
    ZoomTool,
    PlanarRotateTool,

    LengthTool,
    ProbeTool,
    RectangleROITool,
    RectangleROIStartEndThresholdTool,
    RectangleROIThresholdTool,
    EllipticalROITool,
    CircleROITool,
    BidirectionalTool,
    AngleTool,
    CobbAngleTool,
    ArrowAnnotateTool,
    CrosshairsTool,
    PlanarFreehandROITool,

    ToolGroupManager,
    Enums: csToolsEnums,
    utilities: cstUtils,
} = cornerstoneTools;
const { segmentation: segmentationUtils } = cstUtils;
const { MouseBindings } = csToolsEnums;
const brushInstanceNames = {
    CircularBrush: 'CircularBrush',
    CircularEraser: 'CircularEraser',
    SphereBrush: 'SphereBrush',
    SphereEraser: 'SphereEraser',
    ThresholdCircle: 'ThresholdCircle',
    ThresholdSphere: 'ThresholdSphere',
};

const brushStrategies = {
    [brushInstanceNames.CircularBrush]: 'FILL_INSIDE_CIRCLE',
    [brushInstanceNames.CircularEraser]: 'ERASE_INSIDE_CIRCLE',
    [brushInstanceNames.SphereBrush]: 'FILL_INSIDE_SPHERE',
    [brushInstanceNames.SphereEraser]: 'ERASE_INSIDE_SPHERE',
    [brushInstanceNames.ThresholdCircle]: 'THRESHOLD_INSIDE_CIRCLE',
    [brushInstanceNames.ThresholdSphere]: 'THRESHOLD_INSIDE_SPHERE',
};

const brushValues = [
    brushInstanceNames.CircularBrush,
    brushInstanceNames.CircularEraser,
    brushInstanceNames.SphereBrush,
    brushInstanceNames.SphereEraser,
    brushInstanceNames.ThresholdCircle,
    brushInstanceNames.ThresholdSphere,
];

async function addSegmentationsToState(volumeId: string, segmentationId: string) {
    // Create a segmentation of the same resolution as the source data
    // using volumeLoader.createAndCacheDerivedVolume.
    await volumeLoader.createAndCacheDerivedVolume(volumeId, {
        volumeId: segmentationId,
    });

    // Add the segmentations to state
    segmentation.addSegmentations([
        {
            segmentationId,
            representation: {
                // The type of segmentation
                type: csToolsEnums.SegmentationRepresentations.Labelmap,
                // The actual segmentation data, in the case of labelmap this is a
                // reference to the source volume of the segmentation.
                data: {
                    volumeId: segmentationId,
                },
            },
        },
    ]);
}

async function createTools(viewportId: string, renderingEngineId: string, toolGroupId: string, segmentationId: string, volumeId: string) {
    // Add tools to Cornerstone3D
    cornerstoneTools.addTool(AnnotationDisplayTool);
    // cornerstoneTools.addTool(ReferenceCursors);
    cornerstoneTools.addTool(ReferenceLines);
    // cornerstoneTools.addTool(ScaleOverlayTool);

    cornerstoneTools.addTool(LengthTool);
    cornerstoneTools.addTool(ProbeTool);
    cornerstoneTools.addTool(RectangleROITool);
    cornerstoneTools.addTool(RectangleROIStartEndThresholdTool);
    cornerstoneTools.addTool(RectangleROIThresholdTool);
    cornerstoneTools.addTool(EllipticalROITool);
    cornerstoneTools.addTool(CircleROITool);
    cornerstoneTools.addTool(BidirectionalTool);
    cornerstoneTools.addTool(AngleTool);
    cornerstoneTools.addTool(CobbAngleTool);
    cornerstoneTools.addTool(ArrowAnnotateTool);
    cornerstoneTools.addTool(CrosshairsTool);
    cornerstoneTools.addTool(PlanarFreehandROITool);

    cornerstoneTools.addTool(PanTool);
    cornerstoneTools.addTool(WindowLevelTool);
    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.addTool(ZoomTool);
    cornerstoneTools.addTool(PlanarRotateTool);

    cornerstoneTools.addTool(BrushTool)
    cornerstoneTools.addTool(CircleScissorsTool)
    cornerstoneTools.addTool(MIPJumpToClickTool)
    cornerstoneTools.addTool(MagnifyTool)
    cornerstoneTools.addTool(PaintFillTool)
    cornerstoneTools.addTool(RectangleScissorsTool)
    cornerstoneTools.addTool(SegmentationDisplayTool)
    cornerstoneTools.addTool(SphereScissorsTool)
    cornerstoneTools.addTool(StackScrollTool)
    cornerstoneTools.addTool(TrackballRotateTool)
    cornerstoneTools.addTool(VolumeRotateMouseWheelTool)

    // cornerstoneTools.addTool(DragProbeTool);

    // Define a tool group, which defines how mouse events map to tool commands for
    // Any viewport using the group
    const toolGroup = cornerstoneTools.ToolGroupManager.createToolGroup(toolGroupId) as IToolGroup;

    // Add the tools to the tool group
    toolGroup.addTool(AnnotationDisplayTool.toolName);
    toolGroup.addTool(ReferenceCursors.toolName);
    toolGroup.addTool(ReferenceLines.toolName);
    // toolGroup.addTool(ScaleOverlayTool.toolName);

    toolGroup.addTool(LengthTool.toolName);
    toolGroup.addTool(ProbeTool.toolName);
    toolGroup.addTool(RectangleROITool.toolName);
    toolGroup.addTool(RectangleROIStartEndThresholdTool.toolName);
    toolGroup.addTool(RectangleROIThresholdTool.toolName);
    toolGroup.addTool(EllipticalROITool.toolName);
    toolGroup.addTool(CircleROITool.toolName);
    toolGroup.addTool(BidirectionalTool.toolName);
    toolGroup.addTool(AngleTool.toolName);
    toolGroup.addTool(CobbAngleTool.toolName);
    toolGroup.addTool(ArrowAnnotateTool.toolName);
    toolGroup.addTool(CrosshairsTool.toolName);
    toolGroup.addTool(PlanarFreehandROITool.toolName);
    // set interpolation agressiveness while adding new annotation (ps: this does not change if interpolation is ON or OFF)
    toolGroup.setToolConfiguration(PlanarFreehandROITool.toolName, {
        interpolation: { knotsRatioPercentageOnAdd: 30 },
    });

    // set interpolation to be ON while editing only
    toolGroup.setToolConfiguration(PlanarFreehandROITool.toolName, {
        interpolation: { interpolateOnAdd: false, interpolateOnEdit: true },
    });

    toolGroup.addTool(WindowLevelTool.toolName);
    toolGroup.addTool(PanTool.toolName);
    toolGroup.addTool(ZoomTool.toolName);
    toolGroup.addTool(StackScrollMouseWheelTool.toolName, { loop: true });
    toolGroup.addTool(PlanarRotateTool.toolName);

    toolGroup.addTool(BrushTool.toolName)
    toolGroup.addTool(CircleScissorsTool.toolName)
    toolGroup.addTool(MIPJumpToClickTool.toolName)
    toolGroup.addTool(MagnifyTool.toolName)
    toolGroup.addTool(PaintFillTool.toolName)
    toolGroup.addTool(RectangleScissorsTool.toolName)
    toolGroup.addTool(SegmentationDisplayTool.toolName)
    toolGroup.addTool(SphereScissorsTool.toolName)
    toolGroup.addTool(StackScrollTool.toolName)
    toolGroup.addTool(TrackballRotateTool.toolName)
    toolGroup.addTool(VolumeRotateMouseWheelTool.toolName)

    // toolGroup.addTool(DragProbeTool.toolName);

    toolGroup.addToolInstance(
        brushInstanceNames.CircularBrush,
        BrushTool.toolName,
        {
            activeStrategy: brushStrategies.CircularBrush,
        }
    );
    toolGroup.addToolInstance(
        brushInstanceNames.CircularEraser,
        BrushTool.toolName,
        {
            activeStrategy: brushStrategies.CircularEraser,
        }
    );
    toolGroup.addToolInstance(
        brushInstanceNames.SphereBrush,
        BrushTool.toolName,
        {
            activeStrategy: brushStrategies.SphereBrush,
        }
    );
    toolGroup.addToolInstance(
        brushInstanceNames.SphereEraser,
        BrushTool.toolName,
        {
            activeStrategy: brushStrategies.SphereEraser,
        }
    );
    toolGroup.addToolInstance(
        brushInstanceNames.ThresholdSphere,
        BrushTool.toolName,
        {
            activeStrategy: brushStrategies.ThresholdSphere,
        }
    );
    toolGroup.addToolInstance(
        brushInstanceNames.ThresholdCircle,
        BrushTool.toolName,
        {
            activeStrategy: brushStrategies.ThresholdCircle,
        }
    );
    

    toolGroup.setToolPassive(AnnotationDisplayTool.toolName);
    toolGroup.setToolPassive(ReferenceCursors.toolName);
    toolGroup.setToolPassive(ReferenceLines.toolName);
    // toolGroup.setToolPassive(ScaleOverlayTool.toolName);
    // Set the initial state of the tools, here we set one tool active on left click.
    // This means left click will draw that tool.
    toolGroup.setToolPassive(LengthTool.toolName);
    // We set all the other tools passive here, this means that any state is rendered, and editable
    // But aren't actively being drawn (see the toolModes example for information)
    toolGroup.setToolPassive(ProbeTool.toolName);
    toolGroup.setToolPassive(RectangleROITool.toolName);
    toolGroup.setToolPassive(RectangleROIStartEndThresholdTool.toolName);
    toolGroup.setToolPassive(RectangleROIThresholdTool.toolName);
    toolGroup.setToolPassive(EllipticalROITool.toolName);
    toolGroup.setToolPassive(CircleROITool.toolName);
    toolGroup.setToolPassive(BidirectionalTool.toolName);
    toolGroup.setToolPassive(AngleTool.toolName);
    toolGroup.setToolPassive(CobbAngleTool.toolName);
    toolGroup.setToolPassive(ArrowAnnotateTool.toolName);
    // toolGroup.setToolPassive(CrosshairsTool.toolName);
    toolGroup.setToolPassive(PlanarFreehandROITool.toolName);

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

    toolGroup.setToolPassive(BrushTool.toolName)
    toolGroup.setToolPassive(CircleScissorsTool.toolName)
    toolGroup.setToolPassive(MIPJumpToClickTool.toolName)
    toolGroup.setToolPassive(MagnifyTool.toolName)
    toolGroup.setToolPassive(PaintFillTool.toolName)
    toolGroup.setToolPassive(RectangleScissorsTool.toolName)
    toolGroup.setToolPassive(SegmentationDisplayTool.toolName)
    toolGroup.setToolPassive(SphereScissorsTool.toolName)
    toolGroup.setToolPassive(StackScrollTool.toolName)
    toolGroup.setToolPassive(TrackballRotateTool.toolName)
    toolGroup.setToolPassive(VolumeRotateMouseWheelTool.toolName)

    await addSegmentationsToState(volumeId, segmentationId);
    // toolGroup.setToolPassive(DragProbeTool.toolName);
    // // Add the segmentation representation to the toolgroup
    await segmentation.addSegmentationRepresentations(toolGroupId, [
        {
            segmentationId,
            type: csToolsEnums.SegmentationRepresentations.Labelmap,
        },
    ]);
    toolGroup!.addViewport(viewportId, renderingEngineId);

    imageStateStore.leftMouseActive = ArrowAnnotateTool.toolName;
    imageStateStore.toolGroup = toolGroup;
    imageStateStore.bindLeftMouse(LengthTool.toolName);
}

export default createTools;