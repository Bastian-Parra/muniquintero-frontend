import { useDrag } from 'react-dnd';

const DraggableSituation = ({ situation, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SITUATION',
    item: { id: situation.id, situation },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {children}
    </div>
  );
};

export default DraggableSituation;