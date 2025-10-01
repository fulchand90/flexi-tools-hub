import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, Play, Pause, RotateCcw, Settings } from "lucide-react";
import { toast } from "sonner";

const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [showSettings, setShowSettings] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    // Play notification sound
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Fallback to browser notification if audio fails
        toast.success("Timer completed!");
      });
    } else {
      toast.success("Timer completed!");
    }

    if (!isBreak) {
      // Work session completed
      setSessionCount(prev => prev + 1);
      setIsBreak(true);
      
      // Long break every 4 sessions
      const breakDuration = sessionCount > 0 && (sessionCount + 1) % 4 === 0 ? longBreakTime : breakTime;
      setTimeLeft(breakDuration * 60);
      toast.success(`Work session completed! Take a ${breakDuration}-minute break.`);
    } else {
      // Break completed
      setIsBreak(false);
      setTimeLeft(workTime * 60);
      toast.success("Break time over! Ready for another work session?");
    }
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workTime * 60);
    setSessionCount(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = isBreak ? (sessionCount > 0 && sessionCount % 4 === 0 ? longBreakTime : breakTime) : workTime;
    return ((totalTime * 60 - timeLeft) / (totalTime * 60)) * 100;
  };

  const getTimerColor = () => {
    if (isBreak) return "text-green-500";
    return "text-primary";
  };

  const getTimerBg = () => {
    if (isBreak) return "bg-green-500/10";
    return "bg-primary/10";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
              <Timer className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Study Timer Focus
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pomodoro timer to boost your study productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Timer */}
            <div className="lg:col-span-2">
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {isBreak ? "Break Time" : "Work Time"}
                        <span className="text-sm font-normal text-muted-foreground">
                          Session {sessionCount + 1}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {isBreak ? "Take a well-deserved break!" : "Focus on your work"}
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setShowSettings(!showSettings)}
                      variant="outline"
                      size="sm"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    {/* Timer Display */}
                    <div className={`relative w-64 h-64 mx-auto ${getTimerBg()} rounded-full flex items-center justify-center`}>
                      <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-4 border-primary transition-all duration-1000"
                        style={{
                          background: `conic-gradient(from 0deg, var(--primary) ${getProgress()}%, transparent ${getProgress()}%)`
                        }}
                      ></div>
                      <div className="relative z-10 text-center">
                        <div className={`text-5xl font-bold ${getTimerColor()}`}>
                          {formatTime(timeLeft)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          {isBreak ? "Break" : "Work"}
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center gap-4">
                      {!isRunning ? (
                        <Button
                          onClick={startTimer}
                          size="lg"
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Start
                        </Button>
                      ) : (
                        <Button
                          onClick={pauseTimer}
                          size="lg"
                          variant="outline"
                        >
                          <Pause className="w-5 h-5 mr-2" />
                          Pause
                        </Button>
                      )}
                      
                      <Button
                        onClick={resetTimer}
                        size="lg"
                        variant="outline"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Session Stats */}
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Session Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{sessionCount}</div>
                    <div className="text-sm text-muted-foreground">Completed Sessions</div>
                  </div>
                  
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground">
                      {Math.floor(sessionCount * workTime / 60)}h {sessionCount * workTime % 60}m
                    </div>
                    <div className="text-sm text-muted-foreground">Total Work Time</div>
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              {showSettings && (
                <Card className="border-border shadow-lg">
                  <CardHeader>
                    <CardTitle>Timer Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Work Time (minutes)</label>
                      <input
                        type="number"
                        value={workTime}
                        onChange={(e) => setWorkTime(Math.max(1, parseInt(e.target.value) || 25))}
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                        min="1"
                        max="60"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Break Time (minutes)</label>
                      <input
                        type="number"
                        value={breakTime}
                        onChange={(e) => setBreakTime(Math.max(1, parseInt(e.target.value) || 5))}
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                        min="1"
                        max="30"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Long Break (minutes)</label>
                      <input
                        type="number"
                        value={longBreakTime}
                        onChange={(e) => setLongBreakTime(Math.max(1, parseInt(e.target.value) || 15))}
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                        min="1"
                        max="60"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tips */}
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Study Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold">Focus Mode</div>
                      <div className="text-muted-foreground">Eliminate distractions during work sessions</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold">Active Breaks</div>
                      <div className="text-muted-foreground">Move around during breaks</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold">Consistency</div>
                      <div className="text-muted-foreground">Stick to your timer schedule</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudyTimer;
