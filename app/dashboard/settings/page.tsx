"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [theme, setTheme] = useState("system")
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  })

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" defaultValue="John Doe" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" defaultValue="john.doe@example.com" className="mt-1" />
          </div>
          <Button className="mt-2 bg-teal-600 hover:bg-teal-700">Save Profile</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme" className="mt-1">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif">Email Notifications</Label>
            <Switch id="email-notif" checked={notifications.email} onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notif">SMS Notifications</Label>
            <Switch id="sms-notif" checked={notifications.sms} onCheckedChange={v => setNotifications(n => ({ ...n, sms: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notif">Push Notifications</Label>
            <Switch id="push-notif" checked={notifications.push} onCheckedChange={v => setNotifications(n => ({ ...n, push: v }))} />
          </div>
          <Button className="mt-2 bg-teal-600 hover:bg-teal-700">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  )
} 