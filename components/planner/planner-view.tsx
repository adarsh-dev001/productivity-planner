"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  GripVertical, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle
} from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Types
type Priority = "low" | "medium" | "high"
type TaskStatus = "pending" | "completed" | "missed"

interface Task {
  id: string
  title: string
  subject: string
  topic: string
  description?: string
  duration: number
  priority: Priority
  status: TaskStatus
  day: number // 0-6 (Sunday to Saturday)
  startHour: number // 0-23
}

// Sample subject data with colors
const subjects = [
  { id: "physics", name: "Physics", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100" },
  { id: "chemistry", name: "Chemistry", color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100" },
  { id: "biology", name: "Biology", color: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100" },
  { id: "mathematics", name: "Mathematics", color: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100" },
  { id: "english", name: "English", color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100" },
  { id: "history", name: "History", color: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100" },
]

// Sample task data
const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Quantum Mechanics",
    subject: "physics",
    topic: "Wave Functions",
    description: "Study the Schrödinger equation and its applications",
    duration: 2,
    priority: "high",
    status: "pending",
    day: 1, // Monday
    startHour: 9
  },
  {
    id: "task-2",
    title: "Organic Chemistry",
    subject: "chemistry",
    topic: "Alcohols and Phenols",
    description: "Practice reactions of alcohols and phenols",
    duration: 1,
    priority: "medium",
    status: "pending",
    day: 1, // Monday
    startHour: 14
  },
  {
    id: "task-3",
    title: "Calculus",
    subject: "mathematics",
    topic: "Integration",
    description: "Solve problems on definite integrals",
    duration: 2,
    priority: "medium",
    status: "pending",
    day: 2, // Tuesday
    startHour: 10
  },
  {
    id: "task-4",
    title: "Cell Biology",
    subject: "biology",
    topic: "Cell Division",
    description: "Study mitosis and meiosis processes",
    duration: 1.5,
    priority: "high",
    status: "pending",
    day: 3, // Wednesday
    startHour: 16
  }
]

// Helper functions
const getPriorityBadge = (priority: Priority) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">High Priority</Badge>
    case "medium":
      return <Badge variant="default">Medium Priority</Badge>
    case "low":
      return <Badge variant="outline">Low Priority</Badge>
  }
}

const getSubjectColor = (subjectId: string) => {
  const subject = subjects.find(s => s.id === subjectId)
  return subject?.color || "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
}

export function PlannerView() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState<Partial<Task>>({
    priority: "medium",
    status: "pending",
    duration: 1,
    day: 1,
    startHour: 9
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [draggedOver, setDraggedOver] = useState<{ day: number, hour: number } | null>(null)
  
  // Days of the week for display
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  
  // Hours for the time slots (8 AM to 10 PM)
  const hours = Array.from({ length: 15 }, (_, i) => i + 8)
  
  // Handle new task creation
  const handleCreateTask = () => {
    if (!newTask.title || !newTask.subject) return
    
    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title!,
      subject: newTask.subject!,
      topic: newTask.topic || "",
      description: newTask.description,
      duration: newTask.duration || 1,
      priority: newTask.priority as Priority || "medium",
      status: "pending",
      day: newTask.day || 1,
      startHour: newTask.startHour || 9
    }
    
    setTasks([...tasks, task])
    setNewTask({
      priority: "medium",
      status: "pending",
      duration: 1,
      day: 1,
      startHour: 9
    })
    setIsDialogOpen(false)
  }
  
  // Handle task drag start
  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }
  
  // Handle task drag over a time slot
  const handleDragOver = (day: number, hour: number, e: React.DragEvent) => {
    e.preventDefault()
    setDraggedOver({ day, hour })
  }
  
  // Handle task drop
  const handleDrop = (day: number, hour: number) => {
    if (!draggedTask) return
    
    const updatedTasks = tasks.map(task => {
      if (task.id === draggedTask.id) {
        return { ...task, day, startHour: hour }
      }
      return task
    })
    
    setTasks(updatedTasks)
    setDraggedTask(null)
    setDraggedOver(null)
  }
  
  // Handle task status toggle
  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === "completed" ? "pending" : "completed"
        }
      }
      return task
    }))
  }
  
  // Render a task card
  const renderTask = (task: Task) => {
    const subjectColor = getSubjectColor(task.subject)
    const subjectName = subjects.find(s => s.id === task.subject)?.name || task.subject
    
    return (
      <div
        key={task.id}
        draggable
        onDragStart={() => handleDragStart(task)}
        className={cn(
          "rounded-md p-3 mb-2 cursor-move",
          task.status === "completed" ? "opacity-60" : "opacity-100",
          subjectColor
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <GripVertical className="h-4 w-4 mr-1 opacity-50" />
              <h4 className="font-medium truncate">{task.title}</h4>
            </div>
            <div className="text-sm mt-1 mb-2">
              <span className="font-medium">{subjectName}</span>
              {task.topic && <span> • {task.topic}</span>}
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-3.5 w-3.5 mr-1 opacity-70" />
              <span>{task.duration} {task.duration === 1 ? 'hour' : 'hours'}</span>
            </div>
          </div>
          <button 
            onClick={() => toggleTaskStatus(task.id)}
            className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <CheckCircle2 className="h-5 w-5 opacity-40" />
            )}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            {getPriorityBadge(task.priority)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Empty State */}
      {tasks.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Start Planning Your Study Sessions</h3>
            <p className="text-muted-foreground mb-4">
              Add tasks to organize your study schedule and track your progress.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Your First Task
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Weekly Schedule Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-2">
            {/* Time column */}
            <div className="col-span-1">
              <div className="h-12"></div> {/* Empty cell for alignment */}
              {hours.map(hour => (
                <div key={hour} className="h-24 flex items-center justify-center border-r pr-2">
                  <span className="text-sm font-medium">
                    {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? 'PM' : 'AM'}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Days columns */}
            {days.map((day, dayIndex) => (
              <div key={day} className="col-span-1">
                <div className="h-12 flex items-center justify-center font-medium">
                  {day}
                </div>
                {hours.map(hour => {
                  const tasksInSlot = tasks.filter(
                    task => task.day === dayIndex && task.startHour === hour
                  )
                  
                  const isOver = draggedOver?.day === dayIndex && draggedOver?.hour === hour
                  
                  return (
                    <div
                      key={`${dayIndex}-${hour}`}
                      className={cn(
                        "h-24 border border-dashed rounded-md p-1",
                        isOver ? "bg-accent" : "hover:bg-accent/50",
                        tasksInSlot.length > 0 ? "border-solid" : "border-dashed"
                      )}
                      onDragOver={(e) => handleDragOver(dayIndex, hour, e)}
                      onDrop={() => handleDrop(dayIndex, hour)}
                    >
                      <ScrollArea className="h-full">
                        {tasksInSlot.map(task => renderTask(task))}
                      </ScrollArea>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add Task Button */}
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Study Task</DialogTitle>
              <DialogDescription>
                Create a new task for your study schedule. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Quantum Mechanics"
                  value={newTask.title || ""}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={newTask.subject}
                    onValueChange={(value) => setNewTask({ ...newTask, subject: value })}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Wave Functions"
                    value={newTask.topic || ""}
                    onChange={(e) => setNewTask({ ...newTask, topic: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="day">Day</Label>
                  <Select
                    value={newTask.day?.toString()}
                    onValueChange={(value) => setNewTask({ ...newTask, day: parseInt(value) })}
                  >
                    <SelectTrigger id="day">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startHour">Start Time</Label>
                  <Select
                    value={newTask.startHour?.toString()}
                    onValueChange={(value) => setNewTask({ ...newTask, startHour: parseInt(value) })}
                  >
                    <SelectTrigger id="startHour">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? 'PM' : 'AM'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Select
                    value={newTask.duration?.toString()}
                    onValueChange={(value) => setNewTask({ ...newTask, duration: parseFloat(value) })}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="2.5">2.5</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value as Priority })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add more details about this task..."
                  value={newTask.description || ""}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateTask}>Save Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Legend */}
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Color Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {subjects.map(subject => (
              <div 
                key={subject.id}
                className={cn(
                  "px-3 py-1 rounded-md text-sm flex items-center",
                  subject.color
                )}
              >
                <div className="w-2 h-2 rounded-full mr-2 bg-current"></div>
                {subject.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}