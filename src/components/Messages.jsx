const Messages = ({ winner, board, isXNext }) => {

  const noMoves = board.every((el) => el !== null);

  return (
    <div className="status-message">
      
      {!winner && !noMoves && (
        <>
          Turn player is{' '}
          <span className={isXNext ? 'text-green' : 'text-orange'}>
            {isXNext ? 'X' : 'O'}
          </span>
        </>
      )}
      {!winner && noMoves && (
        <>
          <span className="text-green">X</span> and{' '}
          <span className="text-orange">O</span> are both tied !!!!!
        </>
      )}
      
    </div>
  );
};

export default Messages;
