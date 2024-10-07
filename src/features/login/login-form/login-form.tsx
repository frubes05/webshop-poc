import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from "@/hooks/auth/use-auth-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(3).max(50),
});

function LoginForm() {
  const navigate = useNavigate();
  const { handleLogin, credentials } = useAuthContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleLogin(values);
  };

  useEffect(() => {
    if (credentials?.username) {
      navigate("/");
    }
  }, [credentials, navigate]);

  return (
    <div className="w-full flex items-center justify-center md:min-h-screen md:min-w-[400px]">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <FaUserCircle className="mx-auto w-16 h-16 text-blue-500 mb-4" />
          <CardTitle className="text-3xl font-semibold text-gray-800">Login</CardTitle>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input autoComplete="current-username" placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input autoComplete="current-password" type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
