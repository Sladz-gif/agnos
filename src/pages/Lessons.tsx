import { useState, useMemo } from "react";
import { courses, Course, CourseModule } from "@/lib/mockData";
import { Play, Clock, Star, Users, CheckCircle2, Trophy, BarChart3, Search, PlayCircle, ChevronLeft, ArrowRight, Lock, CheckCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Lessons() {
  // State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeModule, setActiveModule] = useState<CourseModule | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const [completedModules, setCompletedModules] = useState<Record<number, number[]>>({});
  const [viewMode, setViewMode] = useState<"all" | "enrolled">("all");
  const [activeCategory, setActiveCategory] = useState<string>("All Courses");

  const categories = ["All Courses", "Soil Science", "Livestock", "Crop Management", "Agri-Tech", "Business"];

  // Logic
  const filteredCourses = useMemo(() => {
    let result = courses || [];
    if (viewMode === "enrolled") {
      result = result.filter(c => enrolledCourses.includes(c.id));
    }
    return result;
  }, [viewMode, enrolledCourses]);

  const getCourseProgress = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.modules || course.modules.length === 0) return 0;
    const completed = completedModules[courseId]?.length || 0;
    return Math.round((completed / course.modules.length) * 100);
  };

  const handleEnroll = (e: React.MouseEvent, course: Course) => {
    e.stopPropagation();
    const isEnrolled = enrolledCourses.includes(course.id);
    
    if (!isEnrolled) {
      setEnrolledCourses(prev => [...prev, course.id]);
      toast.success("Enrolled Successfully!", { description: "Opening course player..." });
    }

    // Open the player
    setSelectedCourse(course);
    setActiveModule(course.modules?.[0] || null);
  };

  const handleToggleModuleCompletion = (courseId: number, moduleId: number) => {
    setCompletedModules(prev => {
      const currentCompleted = prev[courseId] || [];
      const isCompleted = currentCompleted.includes(moduleId);
      
      const updated = isCompleted 
        ? currentCompleted.filter(id => id !== moduleId)
        : [...currentCompleted, moduleId];
        
      if (!isCompleted) toast.success("Module Completed!");
      return { ...prev, [courseId]: updated };
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="bg-card rounded-[2.5rem] p-8 md:p-16 border-2 border-foreground relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]">
        <div className="max-w-3xl space-y-8 relative z-10">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary text-primary-foreground border-none px-4 py-1.5 rounded-none font-black uppercase tracking-widest text-[10px]">Learning Hub</Badge>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Certified by Agnos Institute</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground uppercase italic">
            Master <span className="text-primary not-italic">Sustainable</span> Farming.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-xl">
            Advance your career with courses from world-class agronomists. Gain practical skills that drive high-yield sustainability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg" 
              variant={viewMode === "all" ? "default" : "outline"}
              className="h-16 px-10 text-lg font-black rounded-none gap-3 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              onClick={() => setViewMode("all")}
            >
              Explore All <Search className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant={viewMode === "enrolled" ? "default" : "outline"}
              className="h-16 px-10 text-lg font-black rounded-none gap-3 border-2 border-foreground hover:bg-surface transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setViewMode("enrolled")}
            >
              My Learning <PlayCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      </section>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 border-b border-border/50 pb-6">
        {categories.map((cat) => (
          <Button 
            key={cat} 
            variant={activeCategory === cat ? "default" : "ghost"} 
            className="rounded-none font-black uppercase tracking-widest text-[10px] h-10 px-6"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Course Grid */}
      <section className="space-y-10">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-2">
            <h3 className="text-4xl font-black tracking-tighter uppercase italic">
              {viewMode === "enrolled" ? "My Learning Journey" : "Recommended For You"}
            </h3>
            <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">
              {viewMode === "enrolled" ? `${enrolledCourses.length} Courses in progress` : "Based on your farm profile"}
            </p>
          </div>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.map(course => {
            const isEnrolled = enrolledCourses.includes(course.id);
            const progress = getCourseProgress(course.id);
            
            return (
              <motion.div 
                key={course.id} 
                variants={item} 
                className="group bg-card rounded-none border-2 border-foreground overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col cursor-pointer"
                onClick={(e) => handleEnroll(e, course)}
              >
                <div className="aspect-video relative overflow-hidden border-b-2 border-foreground">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center border-2 border-foreground text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-foreground text-background border-none font-black uppercase tracking-widest text-[9px] rounded-none">
                    {course.level}
                  </Badge>
                </div>

                <div className="p-8 flex-1 flex flex-col space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 font-black text-primary text-xs">
                      {course.instructor?.split(' ').map(n => n[0]).join('') || '??'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest">{course.instructor}</span>
                      <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Expert Instructor</span>
                    </div>
                  </div>

                  <h4 className="text-2xl font-black leading-tight uppercase italic group-hover:text-primary transition-colors flex-1">{course.title}</h4>

                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {course.duration}</div>
                    <div className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4 text-primary" /> {course.modules?.length || 0} Modules</div>
                    <div className="flex items-center gap-1.5 text-amber-500"><Star className="h-4 w-4 fill-current" /> {course.rating}</div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                      <span>Course Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 rounded-none bg-surface border border-foreground/10" />
                  </div>

                  <Button 
                    className={`w-full h-14 rounded-none font-black uppercase tracking-wider border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all px-4
                      ${isEnrolled ? "bg-surface hover:bg-surface/80 text-foreground" : "bg-primary hover:bg-primary/90"}`}
                    onClick={(e) => handleEnroll(e, course)}
                  >
                    {isEnrolled ? "Continue Learning" : "Enroll Course"}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Player Modal */}
      {selectedCourse && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent 
            className="max-w-[95vw] w-full h-[95vh] p-0 overflow-hidden bg-card border-none rounded-none !flex flex-col md:flex-row translate-x-[-50%] translate-y-[-50%] !max-h-[95vh] !max-w-[95vw] !gap-0 !p-0 z-50"
          >
            {/* Sidebar */}
            <div className="w-full md:w-80 border-r-2 border-foreground flex flex-col bg-surface/30">
              <div className="p-6 border-b-2 border-foreground space-y-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedCourse(null)}
                  className="p-0 hover:bg-transparent text-primary font-black uppercase tracking-widest text-[10px]"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back to Lessons
                </Button>
                <h2 className="text-xl font-black uppercase tracking-tighter leading-tight italic">{selectedCourse.title}</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                    <span>Course Completion</span>
                    <span>{getCourseProgress(selectedCourse.id)}%</span>
                  </div>
                  <Progress value={getCourseProgress(selectedCourse.id)} className="h-1.5 rounded-none" />
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                  {selectedCourse.modules?.map((module, idx) => {
                    const isCompleted = (completedModules[selectedCourse.id] || []).includes(module.id);
                    const isActive = activeModule?.id === module.id;
                    
                    return (
                      <button
                        key={module.id}
                        onClick={() => setActiveModule(module)}
                        className={`w-full text-left p-4 border-2 transition-all flex items-start gap-3 group
                          ${isActive 
                            ? "bg-primary border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                            : "bg-card border-transparent hover:border-foreground/30"}`}
                      >
                        <div className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0
                          ${isCompleted ? "bg-foreground text-background border-foreground" : "border-muted-foreground text-transparent"}`}>
                          <CheckCircle className="h-3 w-3" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Module {idx + 1}</p>
                          <p className={`font-bold leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                            {module.title}
                          </p>
                          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-60">
                            <Clock className="h-3 w-3" /> {module.duration}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col bg-card overflow-hidden">
              <ScrollArea className="flex-1 overflow-x-hidden">
                <div className="flex flex-col h-full">
                  {/* Video Area */}
                  <div className="aspect-video bg-black relative flex items-center justify-center group overflow-hidden border-b-2 border-foreground">
                    {activeModule ? (
                      <>
                        <img src={selectedCourse.image} alt="Thumbnail" className="w-full h-full object-cover opacity-40 blur-sm" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-6">
                          <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center border-4 border-foreground text-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:scale-110 transition-transform">
                            <Play className="h-10 w-10 fill-current ml-1" />
                          </div>
                          <div className="text-center space-y-2 px-6">
                            <h3 className="text-2xl font-black uppercase tracking-widest italic">{activeModule.title}</h3>
                            <p className="text-sm font-bold uppercase tracking-widest opacity-80">Ready to play</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-white flex flex-col items-center gap-4">
                        <PlayCircle className="h-16 w-16 opacity-20" />
                        <p className="font-black uppercase tracking-widest opacity-50">Select a module</p>
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="p-8 md:p-12 space-y-12">
                    <div className="flex flex-wrap items-start justify-between gap-8">
                      <div className="space-y-4 max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">{activeModule?.title || selectedCourse.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                          <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> {selectedCourse.students.toLocaleString()} Students</span>
                          <span className="flex items-center gap-2 text-amber-500"><Star className="h-4 w-4 fill-current" /> {selectedCourse.rating} Rating</span>
                        </div>
                      </div>
                      <Button 
                        className={`h-14 px-8 rounded-none font-black uppercase tracking-widest border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all
                          ${activeModule && (completedModules[selectedCourse.id] || []).includes(activeModule.id) ? "bg-success text-success-foreground" : "bg-primary"}`}
                        onClick={() => activeModule && handleToggleModuleCompletion(selectedCourse.id, activeModule.id)}
                      >
                        {activeModule && (completedModules[selectedCourse.id] || []).includes(activeModule.id) ? "Completed" : "Mark Complete"}
                      </Button>
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="w-full justify-start rounded-none bg-transparent border-b-2 border-foreground h-auto p-0 gap-8">
                        <TabsTrigger value="overview" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black uppercase tracking-widest text-xs px-0 py-4">Overview</TabsTrigger>
                        <TabsTrigger value="instructor" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black uppercase tracking-widest text-xs px-0 py-4">Instructor</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="pt-8 space-y-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                          <div className="lg:col-span-8 space-y-8">
                            <div className="space-y-4">
                              <h4 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" /> About this Module
                              </h4>
                              <p className="text-muted-foreground leading-relaxed font-medium">
                                {activeModule?.description || selectedCourse.longDescription}
                              </p>
                            </div>
                            <div className="space-y-6">
                              <h4 className="text-lg font-black uppercase tracking-widest">Learning Objectives</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {selectedCourse.learningObjectives?.map((obj, i) => (
                                  <div key={i} className="flex items-start gap-3 p-4 bg-surface/50 border-2 border-foreground/10 rounded-sm">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                    <span className="text-sm font-bold leading-tight">{obj}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="lg:col-span-4 space-y-8">
                            <div className="p-6 bg-primary/5 border-2 border-foreground space-y-4">
                              <h4 className="font-black uppercase tracking-widest text-xs italic">Course Snapshot</h4>
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Level</span>
                                  <span className="text-xs font-black uppercase tracking-widest">{selectedCourse.level}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Duration</span>
                                  <span className="text-xs font-black uppercase tracking-widest">{selectedCourse.duration}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Modules</span>
                                  <span className="text-xs font-black uppercase tracking-widest">{selectedCourse.modules?.length || 0}</span>
                                </div>
                              </div>
                              <Separator className="bg-foreground/10" />
                              <div className="pt-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Next up</p>
                                <p className="text-sm font-bold italic leading-tight">{selectedCourse.modules?.[1]?.title || "End of course"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="instructor" className="pt-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          <div className="h-32 w-32 rounded-none border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-4xl font-black text-primary">
                              {selectedCourse.instructor?.split(' ').map(n => n[0]).join('') || '??'}
                            </span>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <h3 className="text-3xl font-black uppercase tracking-tighter italic">{selectedCourse.instructor}</h3>
                              <p className="text-primary font-black uppercase tracking-widest text-[10px]">{selectedCourse.instructorRole}</p>
                            </div>
                            <p className="text-muted-foreground leading-relaxed max-w-2xl font-medium">
                              Veteran agricultural specialist with 15+ years experience. Passionate about empowering the next generation of global farmers.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
