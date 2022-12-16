export const LandingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <h1>To Do App</h1>
      <h3>
        Administrador de tareas <span className="text-muted">v1.0</span>
      </h3>
      <p>
        Gestionar tu tiempo es importante, por eso te ayudamos a organizar tus
        tareas.
      </p>
    </div>
  );
};
