import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'SITUATION',
    drop: (item) => onDrop(item.situation),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#f0f0f0' : 'transparent',
        minHeight: '100px',
        width: '50%',
      }}
    >
      {children}
    </div>
  );
};

export default DropZone;