import { useState } from "react";

export function DeleteModal({
  deleteFunction,
}: {
  deleteFunction: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className="btn bg-error text-error-content" onClick={() => setIsModalOpen(true)}>
        Eliminar
      </button>
      <dialog className="modal cursor-default" open={isModalOpen ? true : undefined}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">¿Seguro que quieres eliminar?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn bg-error text-error-content"
                onClick={() => {
                  setIsModalOpen(false);
                  deleteFunction();}}
              >
                Eliminar
              </button>

              <button
                className="btn"
                onClick={() => {
                  setIsModalOpen(false);}}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
