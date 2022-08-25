import React from 'react';

function ClassicPanel({
  error,
  children,
}: {
  error: any;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white m-auto p-7 rounded-[4px] flex flex-col gap-4 items-center z-20 shadow-2xl">
      {children}
    </div>
  );
}

export default ClassicPanel;
