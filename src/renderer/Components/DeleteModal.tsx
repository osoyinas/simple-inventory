import { useState } from "react";

export function DeleteModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(isModalOpen);
  return (
    <>
      <button className="btn" onClick={() => setIsModalOpen(true)}>
        open modal
      </button>
      <dialog className="modal" open={isModalOpen ? true : undefined}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>    </>
  );
}


