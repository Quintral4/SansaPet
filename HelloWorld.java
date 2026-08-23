import java.util.Scanner;

public class HelloWorld {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Estadísticas iniciales (Hunger, Energy, Social)
        int hunger = 10;
        int energy = 10;
        int social = 10;
        boolean isRunning = true;

        System.out.println("=========================================");
        System.out.println("      ¡Bienvenido al simulador Roxie!    ");
        System.out.println("=========================================");

        while (isRunning) {
            // Mostrar pantalla principal con ASCII Art y estado actual
            System.out.println("\nName of Sim: Roxie");
            System.out.println(" |\\__/,|   (`\\");
            System.out.println(" |o o  |__ _)");
            System.out.println(" _.( T   )  `  /");
            System.out.println("((_ `^--' /_<  \\");
            System.out.println("`` `-'(((/  (((/");
            System.out.println();
            System.out.println("Hunger : " + hunger);
            System.out.println("Energy : " + energy);
            System.out.println("Social : " + social);
            System.out.println("-----------------------------------------");
            System.out.println("Comandos disponibles:");
            System.out.println(" [p] Jugar (Play)   [e] Comer (Eat)   [s] Dormir (Sleep)   [q] Salir (Quit)");
            System.out.print("What's your next action? > ");

            String input = scanner.nextLine().trim().toLowerCase();

            switch (input) {
                case "p":
                    if (energy < 2) {
                        System.out.println("\n>>> ¡Roxie está demasiado cansada para jugar!");
                    } else {
                        hunger = Math.max(0, hunger - 2);
                        energy = Math.max(0, energy - 2);
                        social = Math.min(10, social + 3);
                        System.out.println("\n>>> ¡Jugaste con Roxie! Se siente muy feliz y acompañada (+3 Social, -2 Hunger, -2 Energy).");
                    }
                    break;

                case "e":
                    if (hunger >= 10) {
                        System.out.println("\n>>> Roxie ya está llena, no quiere comer más.");
                    } else {
                        hunger = Math.min(10, hunger + 3);
                        energy = Math.max(0, energy - 1);
                        System.out.println("\n>>> Le diste un bocadillo a Roxie (+3 Hunger, -1 Energy).");
                    }
                    break;

                case "s":
                    if (energy >= 10) {
                        System.out.println("\n>>> Roxie no tiene sueño en este momento.");
                    } else {
                        energy = 10;
                        hunger = Math.max(0, hunger - 2);
                        social = Math.max(0, social - 1);
                        System.out.println("\n>>> Roxie tomó una siesta reparadora (Energy al máximo, -2 Hunger, -1 Social).");
                    }
                    break;

                case "q":
                    System.out.println("\n¡Gracias por cuidar a Roxie! Hasta pronto.");
                    isRunning = false;
                    break;

                default:
                    System.out.println("\n>>> Comando no reconocido. Usa 'p', 'e', 's' o 'q'.");
                    break;
            }

            // Chequeo de advertencias según el estado de la mascota
            if (isRunning) {
                if (hunger <= 2) {
                    System.out.println("⚠️  ¡Alerta! Roxie tiene mucha hambre.");
                }
                if (energy <= 2) {
                    System.out.println("⚠️  ¡Alerta! Roxie necesita dormir pronto.");
                }
                if (social <= 2) {
                    System.out.println("⚠️  ¡Alerta! Roxie se siente solitaria.");
                }
            }
        }

        scanner.close();
    }
}