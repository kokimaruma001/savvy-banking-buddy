
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Settings, Mail, Lock, Bell, User, Save } from "lucide-react";

export default function AccountSettings() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // User profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Notification preferences state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    transactionAlerts: true,
  });
  
  // Changes tracking state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Load initial user data
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: "",  // Would typically fetch these from backend
        address: "",
      }));
    }
  }, [user]);
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    setHasUnsavedChanges(true);
  };
  
  // Handle notification toggle changes
  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
    setHasUnsavedChanges(true);
  };
  
  // Validate profile form
  const validateProfileForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (profile.phone && !/^[\d\+\-\(\) ]{10,15}$/.test(profile.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validate password change form
  const validatePasswordForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!profile.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!profile.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (profile.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    if (!profile.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (profile.newPassword !== profile.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Save profile changes
  const saveProfileChanges = () => {
    if (!validateProfileForm()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
    }, 1000);
  };
  
  // Update password
  const updatePassword = () => {
    if (!validatePasswordForm()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setHasUnsavedChanges(false);
      
      // Clear password fields
      setProfile(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  };
  
  // Save notification preferences
  const saveNotificationPreferences = () => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been saved.",
      });
    }, 1000);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <CardTitle>Account Settings</CardTitle>
        </div>
        <CardDescription>Manage your account preferences and personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  className="resize-none"
                  rows={3}
                />
              </div>
              
              <Button 
                onClick={saveProfileChanges}
                disabled={isSubmitting || !hasUnsavedChanges}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={profile.currentPassword}
                  onChange={handleProfileChange}
                  className={errors.currentPassword ? "border-destructive" : ""}
                />
                {errors.currentPassword && <p className="text-sm text-destructive">{errors.currentPassword}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={profile.newPassword}
                  onChange={handleProfileChange}
                  className={errors.newPassword ? "border-destructive" : ""}
                />
                {errors.newPassword && <p className="text-sm text-destructive">{errors.newPassword}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={profile.confirmPassword}
                  onChange={handleProfileChange}
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
              
              <Button 
                onClick={updatePassword}
                disabled={isSubmitting || !profile.currentPassword || !profile.newPassword || !profile.confirmPassword}
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
              
              <Separator className="my-6" />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Account Actions</h3>
                <p className="text-muted-foreground">These actions cannot be undone.</p>
                <div className="pt-4">
                  <Button 
                    variant="destructive"
                    onClick={logout}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-muted-foreground text-sm">Receive notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-muted-foreground text-sm">Receive notifications via text message</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-muted-foreground text-sm">Receive emails about new features and offers</p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="securityAlerts">Security Alerts</Label>
                  <p className="text-muted-foreground text-sm">Get notified about security-related events</p>
                </div>
                <Switch
                  id="securityAlerts"
                  checked={notifications.securityAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('securityAlerts', checked)}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="transactionAlerts">Transaction Alerts</Label>
                  <p className="text-muted-foreground text-sm">Get notified when transactions occur</p>
                </div>
                <Switch
                  id="transactionAlerts"
                  checked={notifications.transactionAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('transactionAlerts', checked)}
                />
              </div>
              
              <Button 
                onClick={saveNotificationPreferences}
                disabled={isSubmitting || !hasUnsavedChanges}
                className="flex items-center gap-2 mt-6"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
