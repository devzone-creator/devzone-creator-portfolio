import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, name } = await req.json()
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }

    // Create the welcome email content
    const emailContent = {
      to: email,
      subject: "Welcome to Munkaila Sule's Tech Community! 🚀",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to My Tech Community</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #06b6d4); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: #e0f2fe; padding: 15px; border-left: 4px solid #06b6d4; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; }
            .social-links { margin: 20px 0; }
            .social-links a { display: inline-block; margin: 0 10px; color: #06b6d4; text-decoration: none; }
            .projects { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .project { margin: 15px 0; padding: 10px; border-left: 3px solid #10b981; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to My Tech Journey! 🎉</h1>
            <p>Thank you for joining my community, ${name || 'fellow developer'}!</p>
          </div>
          
          <div class="content">
            <p>Hi there! 👋</p>
            
            <p>I'm <strong>Munkaila Sule</strong> (fritzbeing), and I'm thrilled you've decided to join my tech community! As a Level 300 CS student and passionate developer, I'm excited to share my journey with you.</p>
            
            <div class="highlight">
              <h3>🚀 What You Can Expect:</h3>
              <ul>
                <li><strong>Weekly Tech Insights:</strong> Curated articles, development tips, and industry trends</li>
                <li><strong>Behind-the-Scenes:</strong> My experiences as a Tax Officer intern at Ghana Revenue Authority</li>
                <li><strong>Project Updates:</strong> Latest developments on my live projects</li>
                <li><strong>Learning Resources:</strong> Compiler engineering, full-stack development, and more</li>
              </ul>
            </div>

            <div class="projects">
              <h3>🔥 Check Out My Live Projects:</h3>
              <div class="project">
                <strong>Ghana Supreme Cases:</strong> Legal database system<br>
                <a href="https://ghanasupremecases.toolforge.org/" style="color: #06b6d4;">Visit Project →</a>
              </div>
              <div class="project">
                <strong>File Frenzy:</strong> File management platform<br>
                <a href="https://filefrenzy.onrender.com/" style="color: #06b6d4;">Visit Project →</a>
              </div>
              <div class="project">
                <strong>ICT Analyzer:</strong> Data analysis tool<br>
                <a href="https://ict-analyzer-assignment.vercel.app/" style="color: #06b6d4;">Visit Project →</a>
              </div>
            </div>

            <p><strong>My Philosophy:</strong> "I code not for money, but for the pure enthusiasm and passion of building something meaningful. I believe in learning by doing - theory has its place, but nothing beats the satisfaction of creating solutions that work."</p>

            <div class="social-links">
              <h3>Let's Connect:</h3>
              <a href="https://github.com/devzone-creator">GitHub</a> |
              <a href="mailto:fraizyglime@gmail.com">Email</a> |
              <a href="tel:+233599882901">Phone</a>
            </div>

            <p>Ready to embark on this tech journey together? Your first newsletter will arrive next Monday with some exciting insights!</p>

            <p>Best regards,<br>
            <strong>Munkaila Sule</strong><br>
            <em>Level 300 CS Student | Tax Officer Intern | Full-Stack Developer</em></p>
          </div>

          <div class="footer">
            <p>📍 Based in Ghana | 🎓 Computer Science Student | 💡 Passionate about innovation</p>
            <p style="font-size: 12px; color: #999;">
              You received this email because you signed up for my newsletter. 
              You can unsubscribe at any time by replying to this email.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Munkaila Sule's Tech Community!
        
        Hi ${name || 'there'}!
        
        Thank you for joining my tech community! I'm Munkaila Sule (fritzbeing), a Level 300 CS student and passionate developer.
        
        What you can expect:
        - Weekly tech insights and development tips
        - Behind-the-scenes from my internship at Ghana Revenue Authority
        - Updates on my live projects
        - Learning resources for compiler engineering and full-stack development
        
        Check out my live projects:
        - Ghana Supreme Cases: https://ghanasupremecases.toolforge.org/
        - File Frenzy: https://filefrenzy.onrender.com/
        - ICT Analyzer: https://ict-analyzer-assignment.vercel.app/
        
        My philosophy: "I code not for money, but for the pure enthusiasm and passion of building something meaningful."
        
        Let's connect:
        GitHub: https://github.com/devzone-creator
        Email: fraizyglime@gmail.com
        Phone: +233599882901
        
        Your first newsletter arrives next Monday!
        
        Best regards,
        Munkaila Sule
        Level 300 CS Student | Tax Officer Intern | Full-Stack Developer
      `
    }

    // In a real implementation, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun  
    // - AWS SES
    // - Resend
    
    // For now, we'll simulate sending the email
    console.log('Welcome email would be sent to:', email)
    console.log('Email content:', emailContent)

    // You would replace this with actual email sending logic:
    /*
    const response = await fetch('https://api.sendgrid.v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: email, name: name }],
        }],
        from: { email: 'fraizyglime@gmail.com', name: 'Munkaila Sule' },
        subject: emailContent.subject,
        content: [
          { type: 'text/plain', value: emailContent.text },
          { type: 'text/html', value: emailContent.html }
        ]
      })
    })
    */

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome email sent successfully!',
        // Remove this in production - only for demo
        preview: emailContent 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error sending welcome email:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send welcome email', 
        message: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})