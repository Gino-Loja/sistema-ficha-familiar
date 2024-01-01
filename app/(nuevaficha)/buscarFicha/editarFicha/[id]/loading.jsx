export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="w-100 vh-100 align-items-center d-flex justify-content-center">
      <div className="text-center d-flex flex-column">
        <center>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Cargando sus datos</div>
        </center>
      </div>
    </div>
  );
}
