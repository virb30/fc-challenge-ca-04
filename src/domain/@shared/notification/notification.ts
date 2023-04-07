export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    addError(error: NotificationErrorProps) {
        this.errors.push(error)
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors
    }

    messages(context?: string): string {
        return this.errors
            .filter(error => !context || error.context === context)
            .map(error => `${error.context}: ${error.message}`)
            .join(", ")
    }
}