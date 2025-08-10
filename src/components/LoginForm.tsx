import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { LoadingSpinner } from "./LoadingSpinner"
import { useAuth } from "../hooks/useAuth"
import { loginSchema, passwordRequirements } from "../lib/validations"
import { cn } from "../lib/utils"

interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  const email = watch("email", "")
  const password = watch("password", "")

  const canSubmit = email && password && 
    passwordRequirements.every(req => req.regex.test(password))

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data)
    
    if (result.success) {
      toast.success("🎉 Successfully signed in! Welcome back!", {
        duration: 4000,
        icon: '✅',
      })
    } else {
      toast.error(`❌ ${result.error || "Sign in failed"}`, {
        duration: 4000,
        icon: '⚠️',
      })
      
      setTimeout(() => {
        toast("🔄 Redirecting to login page...", {
          duration: 2000,
          icon: '🔄',
        })
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  {...register("email")}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  {...register("password")}
                  aria-describedby={errors.password ? "password-error" : "password-requirements"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
              
              {/* Password Requirements */}
              <div id="password-requirements" className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Password requirements:</p>
                <ul className="space-y-1">
                  {passwordRequirements.map((req) => {
                    const isValid = req.regex.test(password)
                    return (
                      <li
                        key={req.id}
                        className={cn(
                          "text-xs flex items-center gap-2",
                          isValid ? "text-green-600" : "text-muted-foreground"
                        )}
                      >
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isValid ? "bg-green-600" : "bg-gray-300"
                          )}
                        />
                        {req.label}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" {...register("rememberMe")} />
              <Label
                htmlFor="rememberMe"
                className="text-sm font-normal cursor-pointer"
              >
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full transition-all duration-300",
                isLoading && "opacity-90 scale-[0.98]"
              )}
              disabled={isLoading || !canSubmit}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <LoadingSpinner size="sm" className="text-white animate-pulse" />
                  <span className="animate-pulse">Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Forgot your password?
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Demo credentials:</p>
            <div className="text-xs space-y-1">
              <p><span className="font-medium">Email:</span> demo@example.com</p>
              <p><span className="font-medium">Password:</span> Password123!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 