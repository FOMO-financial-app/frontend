import { forwardRef, useImperativeHandle, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export const VirtualizedStockList = forwardRef(({
    list,
    highlightedIndex,
    onRowClick,
    onRowHover,
    rowHeight = 32,
    viewportHeight = 300
}, ref) => {
    const parentRef = useRef(null);
    
    const virtualizer = useVirtualizer({
        count: list.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => rowHeight,
        overscan: 5,
    });
    
    //Allows list scroll using the arrows.
    useImperativeHandle(ref, () => ({
        scrollToIndex: (index) => virtualizer.scrollToIndex(index, { aling: 'auto' })
    }));

    const virtualItems = virtualizer.getVirtualItems();
    const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
    const totalSize = virtualizer.getTotalSize();

    return (
        <div className="virtual-list-container">

            <div className="virtual-header">
                <div className="virtual-header-cell">Símbolo</div>
                <div className="virtual-header-cell">Nombre</div>
            </div>
            
            {/* Defines the ViewPort, how many elements are visible, and generates the scrollbar. */}
            <div 
                ref={parentRef} 
                className="virtual-list-content"
                style={{height: `${viewportHeight}px`,
                    overflowY: "auto"}}
            >
                {/* Define the height, allowing the viewport to scroll. */}
                <div
                    style={{
                        height: totalSize,
                        width: "100%",
                        position: "relative",
                    }}
                >
                    {/* Contains visible elements and simulates movement. */}
                    <div
                        style={{
                            transform: `translateY(${paddingTop}px)`,
                            width: '100%',
                        }}
                    >
                        {virtualItems.map(virtual => {
                            const item = list[virtual.index];
                            return (
                                <div
                                    key={virtual.key}
                                    data-index={virtual.index}
                                    className={
                                        "virtual-row " + (virtual.index === highlightedIndex ? "highlighted" : "")
                                    }
                                    onMouseEnter={() => onRowHover(virtual.index)}
                                    onMouseLeave={() => onRowHover(-1)}
                                    onClick={() => onRowClick(item.symbol)}
                                    style={{ 
                                        height: rowHeight,
                                        display: 'flex',
                                        width: '100%',
                                    }}
                                >
                                    <div className="virtual-symbol">{item.symbol}</div>
                                    <div className="virtual-name">{item.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});