## Aim CLI

Aim CLI offers a simple interface to easily organize and record your experiments. Paired with the Python Library, Aim is
a powerful utility to record, search and compare AI experiments. Here are the set of commands supported:

| Command   | Description                                                                               |
|-----------|-------------------------------------------------------------------------------------------|
| `init`    | Initialize the `aim` repository.                                                          |
| `version` | Displays the version of aim cli currently installed.                                      |
| `up`      | Runs Aim web UI for the given repo.                                                       |
| `upgrade` | Upgrades legacy Aim repository from `2.x` to `3.0`.                                       |
| `reindex` | Process runs left in 'in progress' state and optimized finished runs.                     |
| `server`  | Run `aim` remote tracking server accepting incoming RPC requests. _Experimental feature._ |
| `runs`    | Manage run data for the given repo.                                                       |
| `convert` | Tool-set for converting 3rd party data into Aim readable format.                          |

### init

__*This step is optional.*__
Initialize the aim repo to record the experiments.

```shell
$ aim init
```

Creates `.aim` directory to save the recorded experiments to. Running `aim init` in an existing repository will prompt
the user for re-initialization.

| Args                              | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `--repo <repo_path>`              | Path to parent directory of `.aim` repo. _Current working directory by default_ |

__*Beware:*__ Re-initialization of the repo clears `.aim` folder from previously saved data and initializes new repo.
__*Note:*__ This command is not necessary to be able to get started with Aim as aim is automatically initializes with
the first aim function call.

### version

Display the Aim version installed.

```shell
$ aim version
```

### up

Start the Aim web UI locally.

```shell
$ aim up [ARGS]
```

| Args                        | Description                                                                     |
|-----------------------------|---------------------------------------------------------------------------------|
| `-h` &#124; `--host <host>` | Specify host address.                                                           |
| `-p` &#124; `--port <port>` | Specify port to listen to.                                                      |
| `--repo <repo_path>`        | Path to parent directory of `.aim` repo. _Current working directory by default_ |
| `--dev`                     | Run UI in development mode.                                                     |
| `--profiler`                | Enables API profiling which logs run trace inside `.aim/profiler` directory.    |

### upgrade

Upgrade Aim repository containing data logged with older version of Aim.

```shell
$ aim upgrade [ARGS] SUBCOMMAND
```

| Args                              | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `--repo <repo_path>`              | Path to parent directory of `.aim` repo. _Current working directory by default_ |

__upgrade subcommands__

Upgrade `aim` repository from `2.x` to `3.0`.

```shell
$ aim ugrade 2to3 [ARGS]
```

| Args                  | Description                                                          |
| ----------------------| -------------------------------------------------------------------- |
| `--skip-failed-runs`  | Use this flag to skip runs which are failed/have missing or incomplete data. |
| `--skip-checks`       | Use this flag to skip new repository consistency checks. |
| `--drop-existing`     | Use this flag to clear old `.aim` directory. By default old data is kept in `.aim_legacy`.|

### reindex

Update index to include all runs in Aim repo which are left in progress.

```shell
$ aim reindex [ARGS]
```

| Args                              | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `--repo <repo_path>`              | Path to parent directory of `.aim` repo. _Current working directory by default_ |
| `--finalize-only`                 | Only finalize runs left in 'in progress' state. Do not attempt runs optimization. |

### server

Run a gRPC server to collect tracked data from remote clients.

```shell
$ aim server [ARGS]
```

| Args                              | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `--repo <repo_path>`              | Path to parent directory of `.aim` repo. _Current working directory by default_ |
| `-h` &#124; `--host <host>`       | Specify host address.                                     |
| `-p` &#124; `--port <port>`       | Specify port to listen to. _Default is 53800_             |
| `-w` &#124; `--workers <N>`       | Specify number of gPRC workers. _Default is 1 worker_.     |
| `--ssl-keyfile`                   | Specify path to keyfile for secure connection.            |
| `--ssl-certfile`                  | Specify path to cert. file for secure connection.         |

### runs

Upgrade Aim repository runs data.

```shell
$ aim runs [ARGS] SUBCOMMAND
```

| Args                              | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `--repo <repo_path>`              | Path to parent directory of `.aim` repo. _Current working directory by default_ |

__runs subcommands__

| Sub-command   | Description                                                          |
| --------------| -------------------------------------------------------------------- |
| `ls`        | List runs in `aim` repository.                                         |
| `rm`        | Remove run data for given runs hashes. At lease one run should be specified|
| `cp`        | Copy run data for given runs hashes. At lease one run should be specified|
| `mv`        | Move run data for given runs hashes. At lease one run should be specified|

Global expression (`*`) support is available for run hashes. If hash contains `*`, it must be enclosed within
quotes (`''`) as bash resolves the expression before passing it to `aim runs` command.

```shell
$ aim runs ls
```

```shell
$ aim runs rm [HASH] ...
```

```shell
$ aim runs cp [ARGS] [HASH] ...
```

| Args                              | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `--destination <dest_repo_path>`  | Path to destination repo. __Required.__|

```shell
$ aim runs mv [ARGS] [HASH] ...
```

| Args                              | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `--destination <dest_repo_path>`  | Path to destination repo. __Required.__|

### convert

Tool-set for converting 3rd party data into Aim readable format.

```shell
$ aim convert [ARGS] SUBCOMMAND
```

| Args                              | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `--repo <repo_path>`              | Path to parent directory of `.aim` repo. _Current working directory by default_ |

**convert subcommands**

| Sub-command | Description                    |
|-------------|--------------------------------|
| `tf`        | Convert from TensorFlow events |
| `mlflow`    | Convert from MLFlow logs       |

**Sub-command: tf**

| Options       | Description                                                                                  |
|---------------|----------------------------------------------------------------------------------------------|
| `--flat` | Disregard context directory and treat them as distinct run directories. Inactive by default. |

**Sub-command: mlflow**

| Options                               | Description                                                                                  |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| `--tracking_uri` <logs_uri>           | MLFlow logs URI. Can be either an HTTP/HTTPS URI for a remote server, a database connection string, or a local path.|
| `-e` &#124; `--experiment` <exp_name> | MLFlow Experiment name. If specified, only runs for `exp_name` will be converted. |
