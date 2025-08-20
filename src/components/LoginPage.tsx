import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  CheckCircle,
  AlertCircle,
  Building2,
  Users,
  BarChart3,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginPageProps {
  onLogin: (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  isLoading?: boolean;
}

export function LoginPage({
  onLogin,
  isLoading = false,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Simulate authentication (in real app, this would be API call)
    onLogin({ email, password, rememberMe });
  };

  const handleDemoLogin = () => {
    setEmail("sarah.chen@projectflow.com");
    setPassword("demo123");
    setRememberMe(true);

    // Auto-submit after a brief delay
    setTimeout(() => {
      onLogin({
        email: "sarah.chen@projectflow.com",
        password: "demo123",
        rememberMe: true,
      });
    }, 500);

    toast.success("Demo credentials loaded");
  };

  const features = [
    {
      icon: Building2,
      title: "Enterprise Grade",
      description:
        "Built for teams of all sizes with enterprise security",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Seamless collaboration with your entire team",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive insights and reporting capabilities",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full opacity-20 blur-xl" />
            <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full opacity-15 blur-lg" />
            <div className="absolute bottom-32 left-16 w-40 h-40 bg-white rounded-full opacity-10 blur-2xl" />
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full opacity-20 blur-xl" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo & Brand */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  PF
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  ProjectFlow
                </h1>
                <p className="text-blue-100 text-sm">
                  Project Management Platform
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Streamline Your
                <br />
                Project Management
              </h2>
              <p className="text-blue-100 text-lg">
                From planning to execution, manage your projects
                with powerful tools designed for modern teams.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Quote */}
          <div className="mt-12">
            <blockquote className="text-blue-100 italic">
              "ProjectFlow has transformed how we manage our
              projects. The intuitive interface and powerful
              features make it essential for our team."
            </blockquote>
            <div className="flex items-center gap-3 mt-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-sm">
                  Michael Rodriguez
                </p>
                <p className="text-blue-200 text-xs">
                  CTO, TechFlow Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                PF
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProjectFlow
              </h1>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-2xl font-bold text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Sign in to your ProjectFlow account to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Demo Login Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 border-green-200 text-green-700 font-medium"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Try Demo Account
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Error Alert */}
              {errors.general && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {errors.general}
                  </AlertDescription>
                </Alert>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="sarah.chen@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors((prev) => ({
                            ...prev,
                            email: undefined,
                          }));
                        }
                      }}
                      className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      type="button"
                      variant="link"
                      className="px-0 font-normal text-sm text-muted-foreground hover:text-primary"
                      disabled={isLoading}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) {
                          setErrors((prev) => ({
                            ...prev,
                            password: undefined,
                          }));
                        }
                      }}
                      className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer select-none"
                  >
                    Remember me for 30 days
                  </Label>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign in
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="px-0 font-normal text-primary hover:underline"
                    disabled={isLoading}
                  >
                    Contact sales
                  </Button>
                </p>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  Your data is protected with enterprise-grade
                  security and encryption.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our{" "}
              <Button
                variant="link"
                className="px-0 text-xs font-normal"
              >
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button
                variant="link"
                className="px-0 text-xs font-normal"
              >
                Privacy Policy
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}