Login Form — Simple, but Thought Through
This is a small but careful project: a standalone login form I built to test my approach to clean code and real-world UX.

Tech: React 18 + TypeScript, Vite, Tailwind CSS.
No UI libraries. Everything from scratch — forms, validation (React Hook Form + Zod), state, types.

I didn’t just wire up inputs. I thought about how it feels when the login fails, when it’s loading, on a phone, with a keyboard. I made it accessible — it works with screen readers and doesn’t fall apart without JavaScript.

The code is written like I do in real projects:
— types everywhere,
— components that don’t do too much,
— errors handled gracefully, not dumped in the console,
— no unnecessary re-renders.

I’m not showing this off because it looks nice. I’m showing it because I want you to open the code and think:
“Okay, this person knows what they’re doing.”

If you’re curious, take a look:
→ How I structure folders
→ How I name custom hooks
→ Where I keep logic separate
→ Why one input field is its own component

It’s all there.