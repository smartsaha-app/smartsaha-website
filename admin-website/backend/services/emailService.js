// Imports
const { Resend } = require('resend');
const models = require('../models');

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "SmartSaha <no-reply@smart-saha.com>";

const TASK_STATUS_LABELS = {
    not_started: "Non commencée",
    in_progress: "En cours",
    done: "Terminée"
};

// Échapper le HTML : les plaintes viennent du public, on ne doit jamais injecter leur contenu tel quel
function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatDate(date) {
    return new Date(date || Date.now()).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Bloc HTML décrivant une plainte (réutilisé dans les deux emails)
function complaintBlock(complaint) {
    return `
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin:16px 0;">
            <tr>
                <td style="padding:6px 0;color:#6b7280;width:120px;">Titre</td>
                <td style="padding:6px 0;font-weight:600;color:#111827;">${escapeHtml(complaint.title)}</td>
            </tr>
            <tr>
                <td style="padding:6px 0;color:#6b7280;">Page</td>
                <td style="padding:6px 0;color:#111827;">${complaint.page ? escapeHtml(complaint.page) : "—"}</td>
            </tr>
            <tr>
                <td style="padding:6px 0;color:#6b7280;">Reçue le</td>
                <td style="padding:6px 0;color:#111827;">${formatDate(complaint.created_at || complaint.createdAt)}</td>
            </tr>
        </table>
        ${complaint.description ? `
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;font-size:14px;color:#374151;white-space:pre-line;">${escapeHtml(complaint.description)}</div>
        ` : ""}
    `;
}

function layout(title, body) {
    return `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111827;">
            <h2 style="margin:0 0 8px;color:#10b481;">${title}</h2>
            ${body}
            <p style="margin-top:32px;font-size:12px;color:#9ca3af;">Email automatique envoyé par l'espace admin SmartSaha.</p>
        </div>
    `;
}

// Envoie un email et renvoie true/false (le SDK Resend renvoie { error } au lieu de lever une exception)
async function send({ to, subject, html }) {
    try {
        const { error } = await resend.emails.send({ from: FROM, to, subject, html });
        if (error) {
            console.error(`Erreur Resend (${to}) :`, error);
            return false;
        }
        return true;
    } catch (err) {
        console.error(`Erreur lors de l'envoi de l'email (${to}) :`, err);
        return false;
    }
}

module.exports = {

    // Prévenir tous les utilisateurs admin qu'une nouvelle plainte est arrivée
    notifyAdminsNewComplaint: async function(complaint) {
        const users = await models.User.findAll({ attributes: ["email"] });
        const emails = [...new Set(users.map(u => u.email).filter(Boolean))];

        if (emails.length === 0) {
            console.warn("Nouvelle plainte : aucun utilisateur avec un email à prévenir");
            return;
        }

        const html = layout(
            "Nouvelle plainte reçue",
            `<p style="font-size:14px;color:#374151;">Une nouvelle plainte vient d'être envoyée depuis le site.</p>
             ${complaintBlock(complaint)}
             <p style="font-size:14px;color:#374151;">Connectez-vous à l'espace admin pour créer les tâches et les assigner.</p>`
        );

        // Un email par admin, pour ne pas exposer les adresses entre eux
        await Promise.all(emails.map(email => send({
            to: email,
            subject: `Nouvelle plainte : ${complaint.title}`,
            html
        })));
    },

    // Envoyer à un développeur la plainte et la liste de SES tâches sur cette plainte
    notifyDeveloperTasks: async function(developer, complaint, tasks) {
        const taskRows = tasks.map(task => `
            <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(task.title)}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;white-space:nowrap;color:#6b7280;">${TASK_STATUS_LABELS[task.status] || task.status}</td>
            </tr>
        `).join("");

        const html = layout(
            `Bonjour ${escapeHtml(developer.name)},`,
            `<p style="font-size:14px;color:#374151;">Des tâches vous ont été assignées pour la plainte suivante :</p>
             ${complaintBlock(complaint)}
             <h3 style="font-size:15px;margin:24px 0 8px;">Vos tâches (${tasks.length})</h3>
             <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e5e7eb;border-radius:8px;">
                <thead>
                    <tr style="background:#f9fafb;text-align:left;">
                        <th style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">Tâche</th>
                        <th style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">Statut</th>
                    </tr>
                </thead>
                <tbody>${taskRows}</tbody>
             </table>`
        );

        return send({
            to: developer.email,
            subject: `Tâches assignées : ${complaint.title}`,
            html
        });
    }
};
