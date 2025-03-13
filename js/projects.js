// Discord webhook configuration
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1349531013994254426/GAJaJeHi8Vz8aQfxTQjJSwyM3xQdHaHOxbXi0cFcVpW55CoiDlj4bd66qU_m8R4jt614'; // Add your Discord webhook URL here

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Create embed message
    const embedData = {
        embeds: [{
            title: '📨 New Contact Form Submission',
            color: 0x00ff00, // Cyber green color
            fields: [
                {
                    name: '👤 Name',
                    value: name,
                    inline: true
                },
                {
                    name: '📧 Email',
                    value: email,
                    inline: true
                },
                {
                    name: '📱 Phone',
                    value: phone,
                    inline: true
                },
                {
                    name: '💬 Message',
                    value: message,
                    inline: false
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'EHA Team Contact Form'
            }
        }]
    };

    try {
        // Send to Discord webhook
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(embedData)
        });

        if (response.ok) {
            // Clear form
            e.target.reset();
            alert('شكراً لتواصلك معنا! سنرد عليك قريباً.');
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    }
});