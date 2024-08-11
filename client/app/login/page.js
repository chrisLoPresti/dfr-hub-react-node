import LoginForm from "@/components/LoginForm";

function LoginPage() {
  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/dfr_hub_background.jpg')" }}
    >
      <LoginForm />
    </section>
  );
}

export default LoginPage;
